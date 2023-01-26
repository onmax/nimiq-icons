export { };

const icons = document.querySelectorAll<HTMLButtonElement>("[data-icon]")
icons.forEach((icon) => {
    const svg = icon.querySelector("[data-svg]")?.innerHTML
    const copy = icon.querySelector("[data-copy]") as HTMLButtonElement
    const download = icon.querySelector("[data-download]") as HTMLButtonElement

    if (!svg || !copy || !download) return

    copy.addEventListener("click", () => {
        console.log(svg)
        navigator.clipboard.writeText(svg)
        copy.blur()

        // show the data-copied element: set display to initial, opacity to 0, then animate opacity to 1
        const copied = icon.querySelector("[data-copied]") as HTMLElement
        if (!copied) return
        copied.style.display = "initial"
        copied.style.opacity = "1"

        // force hover and focus style to be removed temporarily
        // with css
        copy.classList.add("hidden")
        download.classList.add("hidden")
        setTimeout(() => {
            copy.classList.remove("hidden")
            download.classList.remove("hidden")
        }, 2000)

        // hide the data-copied element after 2 seconds
        setTimeout(() => {
            copied.style.opacity = "0"
            setTimeout(() => (copied.style.display = "none"), 200)
        }, 2000)
    })

    download.addEventListener("click", () => {
        const a = document.createElement("a")
        a.href = `data:image/svg+xml,${encodeURIComponent(svg)}`
        a.download = `${icon.dataset.icon}-icon.svg`
        a.click()
        download.blur()
    })
})