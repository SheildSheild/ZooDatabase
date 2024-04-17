const m=['Manager'], em=['Medic',...m],e=['Employee',...em], c=['Customer'], cm=[...c,...m], ce=[...c,...e], a='All', n=[];
function access(v,m,c){
  return {
    view:v,
    modify:m,
    create:c||m,
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
    "animals":access(a,m),
    "shops":access(a,m),
    "restaurants":access(a,m),
    "employees":access(e,e),
    "animal_health":access(em,em),
    "items":access(ce,m,cm),
    "customers":access(cm,a),
    "lost_items":access(e,a),
    "complaints":access(m,a),
    "schedule_types":access(m,m),
    "employee_schedules":access(e,m),
    "animal_schedules":access(ce,m),
    "shop_schedules":access(ce,m),
    "habitat_schedules":access(ce,m),
    "timesheets":access(e,m),
    "attends_to":access(e,m),
    "purchases":access(cm,m),
    "tickets":access(cm,a),
    "login_customers":access(a,c),
    "login_employees":access(a,m),
    "shop_revenue":access(m,n),
    "ticket_monthly_revenue":access(m,n),
    "pay_stub":access(e,n),
    "monthly_visit":access(m,n),
    "animals_view":access(m,n),
    "animal_health_view":access(m,n),
    "alerts":access(a,n)
  }
}
