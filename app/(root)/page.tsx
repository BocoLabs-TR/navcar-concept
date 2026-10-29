// Static export has no middleware: "/" forwards to the default locale
// with a meta refresh plus a script (which also preserves any #hash).
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/tr/" />
      <script
        dangerouslySetInnerHTML={{
          __html: "location.replace('/tr/' + location.hash);"
        }}
      />
      <noscript>
        <a href="/tr/">Navcar Denizcilik</a>
      </noscript>
    </>
  );
}
