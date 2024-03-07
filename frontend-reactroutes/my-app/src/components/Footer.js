export default function Footer() {
  const year = new Date();
  const copyright = year.getFullYear();

  return (
    <footer>
      <h1>Copyright {copyright}. All Rights Reserved.</h1>
    </footer>
  );
}
