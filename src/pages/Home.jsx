import React, { useContext } from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import { AppContext } from "../contexts/AppContext";

import CleanupToolHeader from "../Cards/CleanupToolHeader";
import ImageEnhancement from "../Cards/UpscaleToolHeader";
import RemoveBackground from "../Cards/RemoveBgToolHeader";
import RemoveTextToolHeader from "../Cards/RemoveTextToolHeader";
import ReplaceBgToolHeader from "../Cards/ReplaceBgToolHeader";
import TextToImageToolHeader from "../Cards/TextToImageToolHeader";
import UncropToolHeader from "../Cards/UncropToolHeader";

function Home() {
  const { step } = useContext(AppContext);

  return (
    <div>
      {step === 0 && (
        <>
          <Header />
          <Steps />
        </>
      )}

      {step === 1 && <CleanupToolHeader />}

      {step === 2 && <ImageEnhancement />}
{step === 6 && <TextToImageToolHeader />}

      {step === 3 && <RemoveBackground />}

      {step === 4 && <RemoveTextToolHeader />}

      {step === 5 && <ReplaceBgToolHeader />}


      {step === 7 && <UncropToolHeader />}
    </div>
  );
}

export default Home;
