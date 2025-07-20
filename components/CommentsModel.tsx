import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
    View,
    Text,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    FlatList,
    TextInput, Keyboard,
} from "react-native";
import { Loader } from "./Loader";
import Comment from "./Comment";

type CommentsModal = {
    postId: Id<"posts">;
    visible: boolean;
    onClose: () => void;
};

export default function CommentsModal({ onClose, postId, visible }: CommentsModal) {
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const comments = useQuery(api.comments.getComments, { postId });
    const addComment = useMutation(api.comments.addComment);
    {/* Todo make the keyboard functionality more realistic */}
    const handleAddComment = async () => {
        if (!newComment.trim() || isSubmitting) return;

        try {
            setIsSubmitting(true);
            // First send the comment
            await addComment({
                content: newComment,
                postId,
            });

            // Then clear the comment and dismiss keyboard
            setNewComment("");
            setIsSubmitting(false);
            Keyboard.dismiss();
        } catch (error) {
            console.log("Error adding comment:", error);
            setIsSubmitting(false);
        }
    };


    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Comments</Text>
                    <View style={{ width: 24 }} />
                </View>

                {comments === undefined ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <Comment comment={item}/>}
                        contentContainerStyle={styles.commentsList}
                    />
                )}

                <View style={styles.commentInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        placeholderTextColor={COLORS.grey}
                        value={newComment}
                        onChangeText={setNewComment}
                        editable={!isSubmitting}
                        multiline
                        returnKeyType="send"
                        onSubmitEditing={handleAddComment}
                    />

                    <TouchableOpacity onPress={handleAddComment} disabled={!newComment.trim() || isSubmitting}>
                        <Text style={[styles.postButton, (!newComment.trim() || isSubmitting) && styles.postButtonDisabled]}>
                            {isSubmitting ? "Posting..." : "Post"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}