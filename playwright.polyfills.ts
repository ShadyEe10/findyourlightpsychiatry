import { TransformStream as NodeTransformStream } from 'node:stream/web';

const hasGlobal = typeof TransformStream !== 'undefined';

if (!hasGlobal && typeof (globalThis as { TransformStream?: unknown }).TransformStream === 'undefined') {
  (globalThis as { TransformStream?: unknown }).TransformStream = NodeTransformStream;
}

