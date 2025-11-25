import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create an MCP server
const server = new McpServer({
    name: 'Dollar Argentina',
    version: '1.0.0'
});


const handleFindDollarPrices = async () => {
    const content = await fetch('https://dolarapi.com/v1/dolares').then((res) => res.json())
    return { content };
}

server.registerTool(
    'findDollarPrices',
    {
        title: 'Find Dollar Prices',
        description: 'Find from an api the dollar prices',
    },
    handleFindDollarPrices
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Dollar Argentina MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});