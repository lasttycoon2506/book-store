import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { AuthenticationStack } from "../../outputs.json";

type User = {
    userName: string;
    passWord: string;
}

const config = {
    region: "us-east-1"
}

const client = new CognitoIdentityProviderClient(config);

export async function addUser(user: User): Promise<unknown> {
    const input = { 
        UserPoolId: `${AuthenticationStack.BookstoreUserPoolId}`, 
        Username: `${user.userName}`, 
        UserAttributes: [ 
          { 
            Name: "STRING_VALUE", 
            Value: "STRING_VALUE",
          },
        ],
        ValidationData: [
          {
            Name: "STRING_VALUE", 
            Value: "STRING_VALUE",
          },
        ]
      };
      const command = new AdminCreateUserCommand(input);
const response = await client.send(command);
return response;
}


