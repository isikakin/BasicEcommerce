using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace IdentityServerSample.Data
{
    public static class ResourceManager
    {
        public static IEnumerable<ApiResource> ApiResources =>
            new List<ApiResource>
            {
                new ApiResource("product.service","Product Service")
            };

        public static IEnumerable<ApiScope> ApiScopes =>
           new List<ApiScope>
           {
               new ApiScope("product.service",new List<string>{ClaimTypes.Role }),
               new ApiScope(IdentityServerConstants.StandardScopes.OfflineAccess)

           };

        public static List<TestUser> TestUsers =>
            new List<TestUser>
            {
                new TestUser
                {
                    SubjectId="1",
                    Username="akini",
                    Password="1234",
                      Claims = new []
                {
                    new Claim(ClaimTypes.Email, "akin.isik@windowslive.com"),
                    new Claim("userId", Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, "Admin")
                },
                      IsActive = true
                },
                new TestUser
                {
                    SubjectId="2",
                    Username="test",
                    Password="1234",
                      Claims = new []
                {
                    new Claim(ClaimTypes.Email, "akin.isik@windowslive.com"),
                    new Claim("userId", Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, "Accounting")
                },
                      IsActive = true
                }
            };
    }
}
