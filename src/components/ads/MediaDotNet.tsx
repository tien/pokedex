import { useLayoutEffect } from "react";
import React from "react";

const MediaDotNetAd = () => {
  useLayoutEffect(() => {
    try {
      window._mNHandle.queue.push(function() {
        window._mNDetails.loadTag("172776212", "728x90", "172776212");
      });
    } catch {}
  }, []);

  return <div id="172776212" />;
};

export default MediaDotNetAd;
