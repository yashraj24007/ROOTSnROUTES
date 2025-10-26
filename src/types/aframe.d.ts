declare module 'aframe' {
  export default any;
}

declare namespace JSX {
  interface IntrinsicElements {
    'a-scene': any;
    'a-entity': any;
    'a-camera': any;
    'a-sky': any;
    'a-box': any;
    'a-sphere': any;
    'a-cylinder': any;
    'a-plane': any;
    'a-text': any;
    'a-light': any;
    'a-assets': any;
    'a-asset-item': any;
    'a-gltf-model': any;
    'a-image': any;
    'a-video': any;
    'a-marker': any;
    'a-animation': any;
    'a-sound': any;
    'a-cursor': any;
  }
}

declare global {
  interface Window {
    AFRAME: any;
  }
}