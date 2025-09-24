from datetime import date, datetime

def get_input(subject_name):
    print(f"\n--- Attendance Input for {subject_name} ---")
    conducted = int(input("  Ab tak kitni hui: "))
    attended = int(input("  Kitni li: "))
    per_week = int(input("  Kitni classes lag rhi hai week m: "))
    return conducted, attended, per_week

def calc_projection(conducted, attended, per_week, target_date, subject_name):
    today = date.today()
    days_left = (target_date - today).days
    weeks_left = days_left / 7   

    future = per_week * weeks_left
    proj_conducted = conducted + future
    proj_attended = attended + future   
    perc = (proj_attended / proj_conducted * 100) if proj_conducted else 0

    print(f"\n📌 {subject_name} ki projected attendance {target_date} tak: {perc:.2f}%")

if __name__ == "__main__":
  
    subject_name = input("Kaunsa subject ka projection chahiye? ")

    
    date_str = input("Kab tak ka attendance projection chahiye? (YYYY-MM-DD): ")
    target_date = datetime.strptime(date_str, "%Y-%m-%d").date()

   
    conducted, attended, per_week = get_input(subject_name)

   
    calc_projection(conducted, attended, per_week, target_date, subject_name)
