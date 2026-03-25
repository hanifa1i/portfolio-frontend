"use client";

import { useState } from "react";
import type { Field } from "@/app/types/Field";
import styles from "./DataTable.module.css";
import { playSound } from "@/app/lib/SoundManager";

type Props<T extends { id: number }> = {
  fields: Field<T>[];
  data: T[];
  renderExpandedRow?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void
};

export default function DataTable<T extends { id: number }>({
  fields,
  data,
  renderExpandedRow,
  onRowClick
}: Props<T>) {
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  const template = fields.map(f => f.width ?? "1fr").join(" ");

  return (
    <div className={`${styles.table}`}>
      {/* Header */}
      <div className={`${styles.row} ${styles.noBorder}`} style={{ gridTemplateColumns: template }}>
        {fields.map(field => (
          <div key={String(field.key)} className={styles.cell}>
            {field.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data.map(row => (
        <div key={row.id}>
          <div
            className={styles.row}
            style={{ gridTemplateColumns: template }}
            onMouseEnter={() => playSound("hover")}
            onClick={() =>
              {playSound("blob"), onRowClick?.(row), setOpenRowId(openRowId === row.id ? null : row.id)}
            }
          >
            {fields.map(field => (
              <div key={String(field.key)} className={styles.cell}>
                {field.render
                  ? field.render(row[field.key], row)
                  : String(row[field.key])}
              </div>
            ))}
          </div>

          {/* Expanded dropdown */}
          {openRowId === row.id && renderExpandedRow && (
            <div className={styles.expandedRow}>
              {renderExpandedRow(row)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
