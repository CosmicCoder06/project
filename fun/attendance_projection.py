from datetime import date, datetime


subjects = [
    "Object Oriented Programming",
    "Database Management System",
    "Computer Organization",
    "Discrete Mathematics",
    "Introduction To Frontend Engineering",
    "Ethics And Values",
    "English For Professional Purposes I",
    "Coding & Programming Aptitude",
    "Object Oriented Programming Lab",
    "Database Management System Lab",
    "Computer Organization Lab",
    "Introduction To Frontend Engineering Lab",
]

def get_input():
    data = []
    print("\n--- Attendance Input ---")
    for sub in subjects:
        print(f"\n{sub}:")
        conducted = int(input("  Ab tak kitni hui: "))
        attended = int(input("  Kitni li: "))
        per_week = int(input("  kitni classes lag rhi hai week m: "))
        data.append({
            "subject": sub,
            "conducted": conducted,
            "attended": attended,
            "per_week": per_week
        })
    return data

def calc_projection(data, target_date):
    today = date.today()
   
    days_remaining = (target_date - today).days
    weeks_remaining = days_remaining / 5 
    
    print("\n--- Projection Result ---")
    total_conducted = 0
    total_attended = 0
    for row in data:
        future_sessions = row["per_week"] * weeks_remaining
        proj_conducted = row["conducted"] + future_sessions
        proj_attended = row["attended"] + future_sessions 
        percentage = (proj_attended / proj_conducted * 100) if proj_conducted > 0 else 0
        
        print(f"{row['subject']}: Projected = {percentage:.2f}%")
        
        total_conducted += proj_conducted
        total_attended += proj_attended
    
    overall = (total_attended / total_conducted * 100) if total_conducted > 0 else 0
    print(f"\n👉 Tumhari total attendence hojaegi {target_date} tak: {overall:.2f}%")

if __name__ == "__main__":
    data = get_input()
   
    target_date = datetime.strptime("2025-09-26", "%Y-%m-%d").date()
    calc_projection(data, target_date)
