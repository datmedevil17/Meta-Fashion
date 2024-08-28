Here’s the updated README with the correct commands for running the frontend and backend:

---

# Meta-Fashion

Meta-Fashion is a cutting-edge Web3 platform that combines the world of digital fashion with decentralized technologies. It allows users to create, mint, and manage digital fashion assets as NFTs, participate in virtual fashion shows, and interact with an immersive Metaverse environment.

## Features

- **Marketplace:** Browse, buy, and sell digital fashion NFTs including shirts, jeans, hoodies, and shoes.
- **Designare:** Create and mint your own fashion designs as NFTs. Share your creations and receive appreciation through likes and donations.
- **Wardrobe:** View and manage your personal collection of digital fashion items.
- **Event Registration:** Mint tickets for fashion shows and participate in exclusive virtual events.
- **Event Queue:** Stay updated with upcoming events and manage your participation.

## Technologies Used

- **Smart Contracts:** ERC1155 for managing digital fashion assets with functionalities for minting, buying, and selling.
- **Frontend:** React with Material-UI for a user-friendly interface and Tailwind CSS for responsive design.
- **3D Rendering:** Three.js and React Three Fiber for creating immersive 3D experiences in the Metaverse.
- **Blockchain:** Ethereum for smart contracts and NFT transactions.
- **Storage:** IPFS for decentralized storage of fashion designs and assets.
- **Backend:** Node.js for running blockchain interactions and managing API requests.
- **GraphQL:** To be integrated in the future for efficient querying and data management.

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meta-fashion.git
   cd meta-fashion
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables by creating a `.env` file based on the `.env.example` file.

### Running the Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the backend server:
   ```bash
   nodemon server.js
   ```

### Deploying the Smart Contracts

1. Deploy smart contracts using Hardhat:
   ```bash
   npx hardhat run scripts/deploy.js --network <network>
   ```

## Usage

- **Browse Marketplace:** Navigate to the Marketplace section to view available fashion NFTs.
- **Create Design:** Use the Designare section to create and mint new fashion designs.
- **Manage Wardrobe:** Access your personal wardrobe to view and manage owned NFTs.
- **Register for Events:** Mint tickets and participate in virtual fashion shows via Event Registration.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [rakshitshukla17@gmail.com](mailto:rakshitshukla17@gmail.com).

---

This version includes the updated commands for running the frontend and backend.
