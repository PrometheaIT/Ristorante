import{b as l,d as c}from"./chunk-NPMWXJE4.js";import{Z as p,ca as u,g as o}from"./chunk-R56C6QW6.js";import{j as n}from"./chunk-4ZZIO3ZI.js";var d=class s{supabaseService=u(l);authService=u(c);supplierProfileSubject=new o(null);supplierProfile$=this.supplierProfileSubject.asObservable();loadSupplierProfile(){return n(this,null,function*(){try{let r=this.authService.currentUserValue;if(!r){console.error("No user authenticated");return}let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("suppliers").select("*").eq("user_id",r.id).single();if(t){console.error("Error loading supplier profile:",t);return}this.supplierProfileSubject.next(e)}catch(r){console.error("Error in loadSupplierProfile:",r)}})}getSupplierRestaurants(){return n(this,null,function*(){try{let r=this.supplierProfileSubject.value;if(!r)return[];let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("ingredients").select(`
          restaurant_id,
          restaurants!inner (
            id,
            name,
            email,
            phone,
            address
          )
        `).eq("supplier_id",r.id).not("restaurant_id","is",null);return t?(console.error("Error loading supplier restaurants:",t),[]):e.map(a=>a.restaurants).filter((a,m,g)=>m===g.findIndex(_=>_.id===a.id))}catch(r){return console.error("Error loading supplier restaurants:",r),[]}})}getSupplierIngredients(){return n(this,null,function*(){try{let r=this.supplierProfileSubject.value;if(!r)return[];let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("ingredients").select(`
          id,
          name,
          description,
          current_stock,
          minimum_stock,
          cost_per_unit,
          created_at,
          restaurant_id,
          restaurants!inner (name)
        `).eq("supplier_id",r.id).order("name");return t?(console.error("Error loading supplier ingredients:",t),[]):e.map(i=>({id:i.id,name:i.name,description:i.description,current_stock:i.current_stock,minimum_stock:i.minimum_stock,cost_per_unit:i.cost_per_unit,restaurant_name:i.restaurants.name||"N/D",restaurant_id:i.restaurant_id,created_at:i.created_at}))}catch(r){return console.error("Error loading supplier ingredients:",r),[]}})}getSupplierProfile(){return this.supplierProfileSubject.value}updateSupplierProfile(r){return n(this,null,function*(){try{let e=this.supplierProfileSubject.value;if(!e)return!1;let{error:t}=yield this.supabaseService.getSupabaseClient().from("suppliers").update(r).eq("id",e.id);if(t)throw t;return yield this.loadSupplierProfile(),!0}catch(e){return console.error("Error updating supplier profile:",e),!1}})}static \u0275fac=function(e){return new(e||s)};static \u0275prov=p({token:s,factory:s.\u0275fac,providedIn:"root"})};export{d as a};
