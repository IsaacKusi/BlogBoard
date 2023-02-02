
const Footer = () => {
    const today = new Date ()
    return <>
<footer className="footer">
    <p>copyright &copy; {today.getFullYear()}</p>
</footer>
    </>
}

export default Footer;