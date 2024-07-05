import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Leva } from "leva";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Leva
        // theme={myTheme} // you can pass a custom theme (see the styling section)
        // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        // flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        // hideTitleBar // default = false, hides the GUI header
        collapsed // default = false, when true the GUI is collpased
        // hidden // default = false, when true the GUI is hidden
      />
    </>
  );
}
