import styles from "./BookInfo.module.css"


export default function BookInfo() {
    return (
        <>  
                <div className={`${styles.bookName}`}>sketchbook</div>
                <div className={`${styles.bookDescription}`}>jdfjfds dsf fds fw r. theth s. rsth st. bt t b tb t ht h. thtahs ht b fg b sr. b tb b tafsdbsrt bs tb sr b r tsh b. rt bs tr h ars</div>
                <div className={`${styles.bookTag}`}>
                    <div>Year</div>
                    <div className={`${styles.tagValue}`}>2008-15</div>
                </div>
                <div className={`${styles.bookTag}`}>
                    <div>Pages</div>
                    <div className={`${styles.tagValue}`}>10</div>
                </div>
                <div className={`${styles.bookTag}`}>
                    <div>Size</div>
                    <div className={`${styles.tagValue}`}>A4</div>
                </div>
            
        </>
    )
}