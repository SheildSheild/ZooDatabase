const e=['Employee','Medic','Manager'],m=['Manager'], em=['Medic','Manager'], c=['Customer'], a='All';
function access(v,m){
  return {
    view:v,
    modify:m,
    rolesWithAccess(method){
      if(method==='GET')
        return v;
      else return m;
    }
  };
}

module.exports={
  routes:{
    "zones":access(e,m),
    "habitats":access(e,m),
    "animals":access(a,e),
    "shops":access(a,m),
    "restaurants":access(a,m),
    "employees":access(m,m),
    "animal_health":access(em,em),
    "items":access(e,m),
    "customers":access(c,a),
    "lost_items":access(e,e),
    "complaints":access(m,c),
    "schedule_types":access(m,m),
    "schedules":access(e,m),
    "attends_to":access(e,m),
    "purchases":access(m,m),
    "tickets":access(m,m),
    "login_customers":access(a,c),
    "login_employees":access(a,m),
    "shop_monthly_revenue":access(m,[]),
    "ticket_monthly_revenue":access(m,[]),
    "pay_stub":access(e,[]),
    "monthly_visit":access(m,[]),
  }
}
