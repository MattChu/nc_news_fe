import { useState } from "react";
import { useParams } from "react-router";

import { patchArticleVotes } from "../utils/patchArticleVotes";

import { FormControl, Grid, Badge, Typography, Button } from "@mui/material";
import { ThumbUp, ThumbDown, ArrowUpward, ArrowDownward } from "@mui/icons-material";

export function Vote({ setVotes, votes }) {
  const { article_id } = useParams();
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isPosiVotes = votes >= 0;
  const handleClick = async (voteChange) => {
    setVotes((preVotes) => preVotes + voteChange);
    setIsErr(false);
    setIsLoading(true);
    try {
      await patchArticleVotes(article_id, voteChange);
      setIsLoading(false);
    } catch (err) {
      setVotes((preVotes) => preVotes - voteChange);
      setIsLoading(false);
      setIsErr(true);
    }
  };

  const renderVote = () => {
    if (isLoading) {
      return (
        <Grid
          container
          direction="row"
          spacing={4}
          sx={{
            minHeight: 88,
            minWidth: 196,
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography textAlign={"center"} sx={{ p: 2.18 }}>
            voting...
          </Typography>
        </Grid>
      );
    }
    if (isErr) {
      return (
        <Grid
          container
          direction="row"
          spacing={4}
          sx={{
            minHeight: 104,
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography color={"error"} textAlign={"center"} sx={{ p: 2.18 }}>
            <strong>Vote Failed Please Try Again Later</strong>
          </Typography>
        </Grid>
      );
    }
    return (
      <>
        <Grid>
          <FormControl>
            <Button sx={{ justifyContent: "left" }} type="button" onClick={() => handleClick(1)}>
              <ArrowUpward sx={{ m: 0.5 }} />
              UpVote
            </Button>
            <Button sx={{ justifyContent: "left" }} type="button" onClick={() => handleClick(-1)}>
              <ArrowDownward sx={{ m: 0.5 }} />
              DownVote
            </Button>
          </FormControl>
        </Grid>
        <Grid>
          <Badge sx={{ p: 0.4 }} showZero={true} badgeContent={votes} color="primary">
            {isPosiVotes ? <ThumbUp sx={{ color: "green" }} /> : <ThumbDown sx={{ color: "red" }} />}
          </Badge>
        </Grid>
      </>
    );
  };

  return <>{renderVote()}</>;
}
