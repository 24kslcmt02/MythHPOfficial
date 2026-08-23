import styles from "./StepFlow.module.css";

/**
 * 手順フロー。順序が意味を持つ内容にのみ使う（使い方・導入フローなど）。
 * 大型数字＋罫線のタイムライン型。
 */
export default function StepFlow({ steps }) {
  return (
    <ol className={styles.flow}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step}>
          <div className={styles.number} aria-hidden="true">
            <span>{i + 1}</span>
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.desc}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
