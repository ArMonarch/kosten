{
  description = "A Nix-flake-based JavaScript/TypeScript(feat. Bun) Development Environment.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";

    # defines system that this flake supports
    systems.url = "github:nix-systems/default-linux";

    # Powered by
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
  };

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = import inputs.systems;

      perSystem = {pkgs, ...}: {
        devShells.default = pkgs.mkShellNoCC {
          packages = with pkgs; [
            bun
            nodejs_latest
            typescript-language-server
          ];
          shellHook = ''
            echo "Initialized JavaScript/TypeScript(feat. Bun) Development Environment"
            echo "  ├── bun: $(bun --version)"
            echo "  └── node:  $(node --version)"
          '';
        };
      };
    };
}
