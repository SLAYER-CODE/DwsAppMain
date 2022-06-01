

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoadSessions
// ====================================================

export interface LoadSessions_Sessiones_phone_id {
  phone_id: string | null;
  phone_number: string | null;
  country_code: string;
}

export interface LoadSessions_Sessiones_shoppingCardt_id {
  shoppingCardt_id: string;
}

export interface LoadSessions_Sessiones_wish_id {
  wish_id: string;
}

export interface LoadSessions_Sessiones {
  photo: string;
  email: string;
  random_code: number | null;
  phone_id: LoadSessions_Sessiones_phone_id | null;
  shoppingCardt_id: LoadSessions_Sessiones_shoppingCardt_id | null;
  wish_id: LoadSessions_Sessiones_wish_id | null;
}

export interface LoadSessions {
  Sessiones: LoadSessions_Sessiones[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_createSessions {
  email: string;
  birthday: any;
  random_code: number | null;
  photo: string;
}

export interface AddUser {
  createSessions: AddUser_createSessions;
}

export interface AddUserVariables {
  createSessionsMyval: UsersInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ComprobationSessions
// ====================================================

export interface ComprobationSessions {
  comprobationUser: boolean;
}

export interface ComprobationSessionsVariables {
  token: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_Categories {
  category_id: string;
  category_name: string;
}

export interface GetCategories {
  Categories: GetCategories_Categories[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProducto
// ====================================================

export interface AddProducto_createproduct {
  product_id: string;
}

export interface AddProducto {
  createproduct: AddProducto_createproduct;
}

export interface AddProductoVariables {
  createproduct: ProductsInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddRelationService
// ====================================================

export interface AddRelationService {
  AgregateRelationService: boolean;
}

export interface AddRelationServiceVariables {
  myval: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRelationLocation
// ====================================================

export interface UpdateRelationLocation {
  UpdateRelationLocation: boolean;
}

export interface UpdateRelationLocationVariables {
  location: GpsUserInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Location_Services
// ====================================================

export interface Get_Location_Services_GpsServices_gps_relation {
  product_name: string;
}

export interface Get_Location_Services_GpsServices {
  gpsService_id: string;
  latitud: string;
  longitud: string;
  gps_relation: Get_Location_Services_GpsServices_gps_relation | null;
}

export interface Get_Location_Services {
  GpsServices: Get_Location_Services_GpsServices[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Service_Location
// ====================================================

export interface Get_Service_Location_Products_gps_relation {
  latitud: string;
  longitud: string;
}

export interface Get_Service_Location_Products {
  product_name: string;
  price_unity: number | null;
  gps_relation: Get_Service_Location_Products_gps_relation[] | null;
}

export interface Get_Service_Location {
  Products: Get_Service_Location_Products[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Producto
// ====================================================

export interface Get_Producto_Products_gps_relation {
  latitud: string;
  longitud: string;
  gpsService_id: string;
  direccion: string;
}

export interface Get_Producto_Products_brands_products {
  brand_name: string;
}

export interface Get_Producto_Products_category_products {
  category_name: string;
}

export interface Get_Producto_Products_image_realation {
  image_name: string | null;
  image_description: string;
}

export interface Get_Producto_Products_user_relation {
  email: string;
}

export interface Get_Producto_Products {
  description: string;
  old_price: number | null;
  product_id: string;
  product_name: string;
  gps_relation: Get_Producto_Products_gps_relation[] | null;
  brands_products: Get_Producto_Products_brands_products[] | null;
  category_products: Get_Producto_Products_category_products[] | null;
  image_realation: Get_Producto_Products_image_realation[] | null;
  user_relation: Get_Producto_Products_user_relation | null;
}

export interface Get_Producto {
  Products: Get_Producto_Products[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Producto_Profile
// ====================================================

export interface Get_Producto_Profile_ProductsProfile_brands_products {
  brand_name: string;
}

export interface Get_Producto_Profile_ProductsProfile_category_products {
  category_name: string;
}

export interface Get_Producto_Profile_ProductsProfile_image_realation {
  image_name: string | null;
  image_description: string;
}

export interface Get_Producto_Profile_ProductsProfile {
  description: string;
  old_price: number | null;
  product_id: string;
  product_name: string;
  price_unity: number | null;
  brands_products: Get_Producto_Profile_ProductsProfile_brands_products[] | null;
  category_products: Get_Producto_Profile_ProductsProfile_category_products[] | null;
  image_realation: Get_Producto_Profile_ProductsProfile_image_realation[] | null;
}

export interface Get_Producto_Profile {
  ProductsProfile: Get_Producto_Profile_ProductsProfile[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_PRoducto_Profile_USers
// ====================================================

export interface Get_PRoducto_Profile_USers_ProductsProfile_gps_relation {
  latitud: string;
  longitud: string;
}

export interface Get_PRoducto_Profile_USers_ProductsProfile_image_realation {
  image_name: string | null;
  image_description: string;
}

export interface Get_PRoducto_Profile_USers_ProductsProfile_products_contrate_gps_id {
  latitud: string;
  longitud: string;
}

export interface Get_PRoducto_Profile_USers_ProductsProfile_products_contrate {
  username: string | null;
  email: string;
  uid: string;
  photo: string;
  gps_id: Get_PRoducto_Profile_USers_ProductsProfile_products_contrate_gps_id | null;
}

export interface Get_PRoducto_Profile_USers_ProductsProfile {
  product_name: string;
  gps_relation: Get_PRoducto_Profile_USers_ProductsProfile_gps_relation[] | null;
  image_realation: Get_PRoducto_Profile_USers_ProductsProfile_image_realation[] | null;
  products_contrate: Get_PRoducto_Profile_USers_ProductsProfile_products_contrate[] | null;
}

export interface Get_PRoducto_Profile_USers {
  ProductsProfile: Get_PRoducto_Profile_USers_ProductsProfile[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Producto_Profile_Contrate
// ====================================================

export interface Get_Producto_Profile_Contrate_ProductsProfileContrate_brands_products {
  brand_name: string;
}

export interface Get_Producto_Profile_Contrate_ProductsProfileContrate_category_products {
  category_name: string;
}

export interface Get_Producto_Profile_Contrate_ProductsProfileContrate_image_realation {
  image_name: string | null;
  image_description: string;
}

export interface Get_Producto_Profile_Contrate_ProductsProfileContrate {
  description: string;
  old_price: number | null;
  product_id: string;
  product_name: string;
  price_unity: number | null;
  brands_products: Get_Producto_Profile_Contrate_ProductsProfileContrate_brands_products[] | null;
  category_products: Get_Producto_Profile_Contrate_ProductsProfileContrate_category_products[] | null;
  image_realation: Get_Producto_Profile_Contrate_ProductsProfileContrate_image_realation[] | null;
}

export interface Get_Producto_Profile_Contrate {
  ProductsProfileContrate: Get_Producto_Profile_Contrate_ProductsProfileContrate[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface UsersInput {
  user_id?: number | null;
  uid: string;
  email: string;
  birthday: any;
  photo?: string | null;
  random_code?: number | null;
  username?: string | null;
}

// null
export interface ProductsInput {
  product_name: string;
  old_price: number;
  price_cantidad: number;
  price_unity?: number | null;
  description?: string | null;
  update_product?: any | null;
  quantity_cantidad?: number | null;
  quantity_unity?: number | null;
  category_products: CategoriesInput[];
  brands_products: BrandsInput[];
  image_realation: ImageProductInput[];
  gps_relation: GpsServicesInput[];
}

// null
export interface CategoriesInput {
  id?: number | null;
  category_name: string;
}

// null
export interface BrandsInput {
  id?: number | null;
  brand_name?: string | null;
}

// null
export interface ImageProductInput {
  image_name: string;
  image_description?: string | null;
}

// null
export interface GpsServicesInput {
  direccion: string;
  latitud: string;
  longitud: string;
}

// null
export interface GpsUserInput {
  direccion: string;
  latitud: string;
  longitud: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================