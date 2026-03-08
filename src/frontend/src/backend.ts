// Auto-generated stub — replaced by build pipeline during deployment
import type { Identity } from "@icp-sdk/core/agent";

export type backendInterface = {
  _initializeAccessControlWithSecret: (secret: string) => Promise<void>;
};

export type CreateActorOptions = {
  agentOptions?: { identity?: Identity | Promise<Identity> };
};

export type ExternalBlob = {
  getBytes: () => Promise<Uint8Array>;
  onProgress?: (progress: number) => void;
};

export namespace ExternalBlob {
  export function fromURL(url: string): ExternalBlob {
    return {
      getBytes: async () => {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        return new Uint8Array(buf);
      },
    };
  }
}

export function createActor(
  _canisterId: string,
  _uploadFile: (blob: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
): Promise<backendInterface> {
  return Promise.resolve({
    _initializeAccessControlWithSecret: async () => {},
  });
}
