//components/UI/LoadingWavyDots.js
import styles from "./LoadingWavyDots.module.css";

export const LoadingWavyDots = ({ text = "" }) => {
  
  return (

    <div className="realtive flex flex-col mx-auto items-center justify-center w-full h-full min-h-screen">
      <div className={styles.wavyDots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      
      <span className="text-acidYellow text-lg font-medium mt-2">{text}</span>
      
    </div>
  );
};
