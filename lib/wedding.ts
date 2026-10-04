// Dates locales à Laval. Renseigner les dates confirmées avant d'activer Google Agenda.
export const wedding: {date:string|null;start:string|null;end:string|null;location:string} = {date:'2027-08-08',start:null,end:null,location:'Laval, Québec'};
export function googleCalendarUrl(event:typeof wedding):string|null {
 if(!event.date)return null;
 const day=event.date.replaceAll('-','');
 let dates:string;
 if(event.start&&event.end){dates=`${day}T${event.start.replaceAll(':','')}00/${day}T${event.end.replaceAll(':','')}00`;}
 else{const next=new Date(event.date+'T12:00:00Z');next.setUTCDate(next.getUTCDate()+1);dates=day+'/'+next.toISOString().slice(0,10).replaceAll('-','');}
 const params=new URLSearchParams({action:'TEMPLATE',text:'Notre mariage à Laval',dates,ctz:'America/Toronto',location:event.location,details:'Cérémonie, réception et célébration de notre mariage. Consultez l’invitation pour les détails confirmés.'});
 return 'https://calendar.google.com/calendar/render?'+params.toString();
}
