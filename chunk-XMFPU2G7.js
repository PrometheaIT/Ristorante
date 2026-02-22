import{a as u}from"./chunk-AMYEPXIV.js";import{Y as i,na as o}from"./chunk-5BU4UD4M.js";import{g as s}from"./chunk-RA2WU32H.js";var c=class a extends u{getTableName(){return"promotion_notifications"}daysUntilNextAllowed(){return s(this,null,function*(){let e=yield this.getCurrentRestaurantId();if(!e)return 0;let{data:r}=yield this.getSupabaseClientPublic().from(this.getTableName()).select("sent_at").eq("restaurant_id",e).order("sent_at",{ascending:!1}).limit(1);if(!r||r.length===0)return 0;let t=new Date(r[0].sent_at),n=Math.ceil((Date.now()-t.getTime())/(1e3*60*60*24));return n>=7?0:7-n})}hasBeenNotified(e){return s(this,null,function*(){let r=yield this.getCurrentRestaurantId();if(!r)return!1;let{data:t}=yield this.getSupabaseClientPublic().from(this.getTableName()).select("id").eq("promotion_id",e).eq("restaurant_id",r).limit(1);return(t?.length??0)>0})}sendPromotionPush(e){return s(this,null,function*(){let r=yield this.getCurrentRestaurantId();if(!r)return{success:!1,errorCode:"unknown",message:"Ristorante non trovato"};let{data:t}=yield this.getSupabaseClientPublic().from("push_subscriptions").select("*").eq("is_active",!0);if(!t||t.length===0)return{success:!1,errorCode:"no_recipients",message:"Nessun follower attivo"};for(let n of t)yield this.getSupabaseClientPublic().from(this.getTableName()).insert({promotion_id:e,restaurant_id:r,user_id:n.user_id,channel:"push",status:"sent",sent_at:new Date().toISOString()});return{success:!0,sent:t.length}})}getMyPromotions(){return s(this,null,function*(){let e=this.authService.currentUserValue?.id;if(!e)return[];let{data:r,error:t}=yield this.getSupabaseClientPublic().from("promotion_notifications").select(`
      id,
      sent_at,
      promotion:promotions!inner (
        id,
        name,
        description,
        image_url,
        type,
        discount_value,
        max_discount_amount,
        valid_from,
        valid_until,
        min_order_amount,
        is_public
      ),
      restaurant:restaurants!inner (
        id,
        name,
        logo_url
      )
    `).eq("user_id",e).order("sent_at",{ascending:!1});return t?(console.error("Errore nel recupero promozioni utente:",t),[]):(r||[]).map(n=>({notification_id:n.id,sent_at:n.sent_at,promotion:n.promotion,restaurant:n.restaurant}))})}static \u0275fac=(()=>{let e;return function(t){return(e||(e=o(a)))(t||a)}})();static \u0275prov=i({token:a,factory:a.\u0275fac,providedIn:"root"})};export{c as a};
