"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/apps/[id]/page.module.css";

export default function MockupSwitcher() {
  const [swapped, setSwapped] = useState(false);

  return (
    <div 
      className={styles.f2Visual} 
      onClick={() => setSwapped(!swapped)}
      style={{ cursor: 'pointer' }}
      title="Click to swap screens"
    >
      <div className={styles.floatContainer}>
        <div className={`${styles.samsungMockup} ${swapped ? styles.posFront : styles.posBack}`}>
          <Image src="/showcase/categories.jpg" alt="Categories Screen" width={300} height={600} />
        </div>
        <div className={`${styles.samsungMockup} ${swapped ? styles.posBack : styles.posFront} ${!swapped ? 'shadow-2xl' : ''}`}>
          <Image src="/showcase/calendar.jpg" alt="Calendar Screen" width={300} height={600} />
        </div>
      </div>
    </div>
  );
}
