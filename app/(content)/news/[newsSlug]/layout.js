export default function NewsDetailLayout({children, modal}){
    //@modal'ın üzerinde olduğu için, modal prop buraya gelir.

    // @modal, sadece image klasörü ile bir şey intercept olursa çalışacak. ama
    // news/someslug olsa @modal burada çalışmaz, ekranda gözükmez.
    return(
        <>
        {modal} {/* önde modal page content, altta children(bu layout'un hizasındaki page.js=NewsDetailPage) */}
        {children}
        </>
    )
}