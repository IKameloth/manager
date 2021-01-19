import { useEffect, useState, useRef } from "react"

function useSticky() {
  const [sticky, setSticky] = useState(false)
  const element = useRef(null)

  const handleScroll = () => {
    const main = document.getElementById("main");
    main.scrollTop > element.current.getBoundingClientRect().bottom
      ? setSticky(true)
      : setSticky(false)
  }

  useEffect(() => {
    const main = document.getElementById("main");

    const handleScrollEvent = () => {
      handleScroll();
    }

    main.addEventListener("scroll", handleScrollEvent);

    return () => {
      main.removeEventListener("scroll", () => handleScrollEvent)
    }
  }, []);

  return { sticky, element }
}

export default useSticky