import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dayjs from 'dayjs';
import postsData from '@/data/posts.json';
import { useState } from 'react';

export default function Home() {
  const [pending, setPending] = useState(false);
  const [url, setUrl] = useState('https://shopee.vn');

  const createLink = async () => {
    setPending(true);
    try {
      const res = await fetch('/api/afflink', { method:'POST', body: JSON.stringify({ url }) });
      const data = await res.json();
      alert('Affiliate URL: ' + (data.short || data.error));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopee AI Review</title>
        <meta name="description" content="Blog AI review sản phẩm Shopee + mẹo công nghệ" />
      </Head>
      <header className={styles.header}>
        <img src="/logo.svg" alt="logo" height={28} />
      </header>
      <main className={styles.main}>
        <h1>Blog AI: Review Shopee & Mẹo công nghệ</h1>
        <p className={styles.sub}>Bài viết tự động mỗi ngày. Gắn link affiliate qua Accesstrade.</p>

        <div className={styles.affbox}>
          <input placeholder="Dán link sản phẩm Shopee..." value={url} onChange={e=>setUrl(e.target.value)} />
          <button onClick={createLink} disabled={pending}>{pending ? 'Đang tạo...' : 'Tạo link affiliate'}</button>
        </div>

        <section className={styles.grid}>
          {postsData.map((p:any) => (
            <article key={p.id} className={styles.card}>
              <img src={p.image} alt="thumb" />
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <div className={styles.meta}>
                <span>{dayjs(p.createdAt).format('DD/MM/YYYY')}</span>
                <a href={p.productUrl} target="_blank" rel="noreferrer">Xem sản phẩm</a>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer className={styles.footer}>© {new Date().getFullYear()} Shopee AI Review</footer>
    </div>
  );
}
