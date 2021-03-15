using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServerSample.Data
{
    public static class ClientManager
    {
        public static IEnumerable<Client> Clients =>
           new List<Client>
           {
                new Client
                {
                    ClientName = "Angular App",
                    ClientId ="angular-app",
                    AllowedGrantTypes=GrantTypes.ResourceOwnerPassword,
                    ClientSecrets={new Secret("secret".Sha256())},
                    AllowedScopes=new List<string>{
                        "product.service",
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        IdentityServerConstants.StandardScopes.Profile,
                    },
                    AllowOfflineAccess = true
                }
           };
    }
}
