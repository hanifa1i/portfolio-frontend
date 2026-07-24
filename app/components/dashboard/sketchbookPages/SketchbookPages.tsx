import type { Page } from "@/app/types/Dashboard";
import styles from "./SketchbookPages.module.css";

type Props = {
  pages: Page[];
};

export default function SketchbookPages({ pages }: Props) {
  if (pages.length === 0) {
    return <div>No pages</div>;
  }

  return (
    <div className={styles.pageList}>
      {pages.map(page => (
        <div key={page.id} className={styles.pageItem}>
          <span className={`${styles.pageNo}`}>Page {page.pageNumber}</span>
          <img className={`${styles.preview}`} src={page.sketchUrl} width={60} />
        </div>
      ))}
    </div>
  );
}
