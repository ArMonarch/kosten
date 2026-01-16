{
  description = "A Nix-flake-based Java Development Environment";

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
          packages = let
            jdk = pkgs.jdk25;
          in
            with pkgs; [
              jdk
              (
                maven.override
                {jdk_headless = jdk;}
              )
            ];
          shellHook = ''
            echo "Initialized Java Development Environment"
            echo "  ├── javac: $(javac --version)"
            echo "  ├── java:"
            java --version | while read line; do echo "  │   - $line"; done
            echo "  └── maven:"
            mvn --version | while read line; do echo "      - $line"; done
          '';
        };
      };
    };
}
