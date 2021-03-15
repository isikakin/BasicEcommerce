using AutoMapper;
using Project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Models.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<CreateProductModel, Product>();
            CreateMap<UpdateProductModel, Product>();
            CreateMap<CreateProductImageModel, ProductImage>();
            CreateMap<UpdateProductImageModel, ProductImage>();
        }
    }
}
