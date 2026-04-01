from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import data_generator as dg
import ai_models as ai
import numpy as np

app = FastAPI(title="AEROLYTIX AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/energy-analysis")
def get_energy_analysis():
    df = dg.generate_energy_data(48) # Last 48 hours for graph
    df_result = ai.run_energy_anomaly_detection(df)
    
    # Format strings for JSON
    df_result['timestamp'] = df_result['timestamp'].astype(str)
    anomalies = df_result[df_result['is_anomaly'] == 1]
    
    return {
        "status": "success",
        "current_energy_kwh": float(df_result['energy_kwh'].iloc[-1] + np.random.normal(0, 10)),
        "current_carbon_emissions": float(df_result['energy_kwh'].iloc[-1] * 0.4), # simple conversion
        "anomalies_detected": len(anomalies),
        "recent_trend": df_result[['timestamp', 'energy_kwh', 'is_anomaly']].to_dict(orient='records'),
        "recommendations": [
            "Reduce truck idle time in Zone A",
            "Optimize chiller equipment scheduling"
        ] if len(anomalies) > 0 else ["Energy usage optimal", "Consider shifting cooler maintenance to off-peak hours"]
    }

@app.get("/cargo-forecast")
def get_cargo_forecast():
    df_demand = dg.generate_cargo_demand(30)
    df_capacity = dg.generate_capacity_utilization(10)
    
    forecast = ai.run_demand_forecast(df_demand, steps=7)
    
    df_demand['date'] = df_demand['date'].astype(str)
    
    # Current state
    current_capacity = float(df_capacity['warehouse_utilization_pct'].iloc[-1])
    
    return {
        "status": "success",
        "historical_demand": df_demand.tail(14).to_dict(orient='records'),
        "forecast": forecast,
        "current_capacity_pct": current_capacity,
        "capacity_risk": "High" if current_capacity > 85 else "Medium" if current_capacity > 70 else "Low",
        "planning_recommendations": [
            "Schedule 2 extra labor shifts for upcoming weekend due to forecast spike",
            "Allocate 4 additional forklifts to Terminal B"
        ]
    }

@app.get("/security-risk-analysis")
def get_security_risk_analysis():
    df_declarations = dg.generate_cargo_declarations(50)
    df_scored = ai.run_security_nlp_analysis(df_declarations)
    
    high_risk = df_scored[df_scored['risk_score'] > 0.6]
    
    return {
        "status": "success",
        "total_scanned_today": 1245 + np.random.randint(-50, 50),
        "high_risk_alerts": len(high_risk),
        "declarations": df_scored.to_dict(orient='records'),
        "overview": {
            "cleared": len(df_scored) - len(high_risk),
            "held": len(high_risk)
        }
    }

@app.get("/dashboard-metrics")
def get_dashboard_metrics():
    # Overall metrics for the top dashboard
    return {
        "total_cargo_processed_today": 8450 + np.random.randint(-100, 200),
        "active_trucks": np.random.randint(15, 45),
        "energy_kwh": 12500 + np.random.randint(-500, 500),
        "carbon_emissions": 5000 + np.random.randint(-200, 200),
        "warehouse_utilization": np.random.randint(65, 95),
        "alerts": np.random.randint(0, 5)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
