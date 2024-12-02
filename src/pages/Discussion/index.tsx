import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  Container,
  DiscussionHeader,
  DiscussionTitle,
  CreatorInfo,
  Avatar,
  CommentsList,
  CommentItem,
  CommentHeader,
  CommentForm,
} from "./styled";
import { StyledTextField } from "../Login/styled";
import { useGlobalState } from "../../context/GlobalStateContext";
import axios from "axios";

interface User {
  username: string;
  name: string;
  profilePhoto: string;
}

interface Comment {
  content: string;
  user: User;
}

interface Discussion {
  groupId: number;
  discussionId: number;
  name: string;
  creatorUser: User;
}

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => (
  <CommentItem>
    <CommentHeader>
      <CreatorInfo>
        <Avatar src={comment.user.profilePhoto} alt={comment.user.name} />
        <div>
          <strong>{comment.user.name}</strong> (@{comment.user.username})
        </div>
      </CreatorInfo>
    </CommentHeader>
    <p>{comment.content}</p>
  </CommentItem>
);

export const Discussion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const discussion = location.state?.discussion as Discussion | undefined;
  const [comments, setComments] = useState<Comment[]>([]);
  const { state } = useGlobalState();

  const fetchComments = async () => {
    if (discussion) {
      try {
        const response = await axios.get(
          `/api/groups/${discussion.groupId}/discussions/${discussion.discussionId}/comments`
        );
        const fetchedComments = response.data.map((comment: any) => ({
          content: comment.texto,
          user: {
            username: comment.user.username,
            name: comment.user.name,
            profilePhoto: comment.user.profilePhoto,
          },
        }));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  useEffect(() => {
    if (discussion) {
      fetchComments();
    }
  }, [discussion]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && discussion) {
      const newCommentObj: Comment = {
        content: newComment.trim(),
        user: {
          username: state.username,
          name: state.name,
          profilePhoto: state.profilePhoto,
        },
      };

    try {
      await axios.post(
        `/api/groups/${discussion.groupId}/discussions/${discussion.discussionId}/comments`,
        {
          iduser: state.id,
          texto: newComment.trim(),
        }
      )

      comments.push(newCommentObj);
      setNewComment("");
      setComments([...comments]);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }
};

  if (!discussion) {
    return <div>Esta discusion ha sido eliminada.</div>;
  }

  return (
    <Container>
      <DiscussionHeader>
        <DiscussionTitle>{discussion.name}</DiscussionTitle>
        <Button onClick={handleGoBack} variant="contained">
          Volver
        </Button>
      </DiscussionHeader>
      <CreatorInfo>
        <Avatar
          src={discussion.creatorUser.profilePhoto}
          alt={discussion.creatorUser.name}
        />
        <div>
          Iniciado por <strong>{discussion.creatorUser.name}</strong> (@
          {discussion.creatorUser.username})
        </div>
      </CreatorInfo>
      <CommentsList>
        <h2>Comentarios</h2>
        <CommentForm onSubmit={handleCommentSubmit}>
          <StyledTextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            helperText={`${newComment.length}/100`}
            slotProps={{
              htmlInput: { maxLength: 100 },
            }}
            style={{ marginRight: "1rem", minWidth: "400px" }}
          />

          <Button
            sx={{ height: "50px" }}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Enviar
          </Button>
        </CommentForm>

        {comments.map((comment) => (
          <CommentComponent comment={comment} />
        ))}
      </CommentsList>
    </Container>
  );
};

export default Discussion;
