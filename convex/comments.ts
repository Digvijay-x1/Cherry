import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {getAuthenticatedUser} from "./users";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/default?d=mp";


export const addComment = mutation({
    args: {
        content: v.string(),
        postId: v.id("posts")
    },
    handler: async (ctx,args) => {
        const currentUser = await getAuthenticatedUser(ctx);
        const post = await ctx.db.get(args.postId);
        if(!post) throw new Error("Post not found");

        const commentId = await ctx.db.insert("comments",{
            userId: currentUser._id,
            postId: args.postId,
            content: args.content,
        });


        // Handle both undefined and number cases for comments
        const currentComments = post.comments ?? 0; // Use nullish coalescing to default to 0
        await ctx.db.patch(args.postId, {
            comments: currentComments + 1
        });


        // create a notification if it's not my own post

        if (post.userId !== currentUser._id) {
            await ctx.db.insert("notifications", {
                receiverId: post.userId,
                senderId: currentUser._id,
                type: "comment",
                postId: args.postId,
                commentId,
            });
        }
        return commentId;
    }
})

export const getComments = query({
    args: {
        postId: v.id("posts")
    },
    handler: async (ctx,args) => {
        const comments = await ctx.db.query("comments")
            .withIndex("by_posts", q=>q.eq("postId",args.postId))
            .order("desc")
            .collect();

        const commentsWithInfo = await Promise.all(
            comments.map(async (comment) => {
                const user = await ctx.db.get(comment.userId);

                if(!user) {
                    return {
                            ...comment,
                            user: {
                                fullName: "Deleted User",
                                image: DEFAULT_AVATAR, // you should
                            },
                        };

                }
                return {
                    ...comment,
                    user: {
                        fullName: user!.fullName,
                        image: user!.image || DEFAULT_AVATAR, // Fallback if the user image is not set
                    },
                }
            })
        )
        return commentsWithInfo;
    }
})