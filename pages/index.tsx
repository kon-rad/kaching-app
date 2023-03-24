import React, { useEffect, useState } from "react";
import TransferForm from "../components/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import TransactionSlider from "../components/TransactionSlider";
import Fund from "../components/Fund";
import CashOut from "../components/CashOut";
import { Box } from "@chakra-ui/react";
import ReviewTransfer from "../components/ReviewTransfer";
import Navbar from "components/Navbar";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns home page that renders the appropriate component based on user selection
 */

const Home = () => {
  const { type, renderTxPage, renderReviewPage } = useFormContext();
  const session = useSession();
  const router = useRouter();

  const componentLogic = () => {
    if (type === "send" || type === "request") {
      if (renderTxPage) {
        return <TransferForm />;
      } else if (renderReviewPage) {
        return <ReviewTransfer />;
      }
    } else if (type === "fund") {
      return <Fund />;
    } else if (type === "cashout") {
      return <CashOut />;
    }
  };

  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <Box>
      <Navbar />
      <TransactionSlider />
      {componentLogic()}
    </Box>
  );
};

export default Home;
