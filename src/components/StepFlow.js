import styles from "./StepFlow.module.css";

export default function StepFlow({ steps }) {
  return (
    <div className={styles.flow}>
      {steps.map((step, i) => (
        <div key={i} className={styles.step}>
          <div className={styles.number}>
            <span>{i + 1}</span>
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.desc}>{step.description}</p>
          </div>
          {i < steps.length - 1 && (
            <div className={styles.connector}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
