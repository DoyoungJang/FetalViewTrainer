// Streamlit's component handshake. Ordinary static-site visits are unaffected.
// Protocol: https://github.com/streamlit/component-template
if (window.parent !== window) {
  const send = (type, payload = {}) => window.parent.postMessage(
    {isStreamlitMessage: true, type, ...payload}, window.location.origin
  );
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.origin !== window.location.origin ||
        event.data?.type !== 'streamlit:render') return;
    const requestedHeight = Number(event.data.args?.height);
    const height = Number.isFinite(requestedHeight)
      ? Math.min(2000, Math.max(600, requestedHeight)) : 1000;
    send('streamlit:setFrameHeight', {height});
  });
  send('streamlit:componentReady', {apiVersion: 1});
}
