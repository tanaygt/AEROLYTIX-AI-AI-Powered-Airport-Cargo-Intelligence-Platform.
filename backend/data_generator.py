import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

def generate_energy_data(rows=400):
    dates = pd.date_range(end=datetime.now(), periods=rows, freq='H')
    base_energy = np.random.normal(500, 50, rows)
    # Add anomalies
    anomaly_indices = random.sample(range(rows), int(rows * 0.05))
    for i in anomaly_indices:
        base_energy[i] += random.choice([200, 300, -200])
    
    return pd.DataFrame({
        'timestamp': dates,
        'energy_kwh': base_energy,
        'equipment_active': np.random.randint(20, 50, rows),
        'trucks_active': np.random.randint(10, 40, rows),
    })

def generate_cargo_demand(rows=30):
    dates = pd.date_range(end=datetime.now(), periods=rows, freq='D')
    trend = np.linspace(100, 150, rows)
    seasonality = np.sin(np.arange(rows) * 0.2) * 20
    noise = np.random.normal(0, 10, rows)
    volume = trend + seasonality + noise
    return pd.DataFrame({
        'date': dates,
        'cargo_volume_tons': np.maximum(volume, 0)
    })

def generate_cargo_declarations(rows=100):
    descriptions = [
        "Electronics and microchips, clean", "Fresh produce, perishable", 
        "Machine parts, heavy", "Textiles and clothing", 
        "Medical supplies, urgent", "Unlabeled hazardous material warning", 
        "Used auto parts, oil leak suspected", "Standard documents",
        "Toys and games", "Industrial chemicals, missing paperwork"
    ]
    airlines = ["AeroAir", "GlobalFreight", "FastTrackCargo", "SkyLogistics"]
    
    data = []
    for i in range(rows):
        data.append({
            'shipment_id': f"SHP-{10000+i}",
            'airline': random.choice(airlines),
            'description': random.choice(descriptions),
            'declared_weight_kg': np.random.uniform(50, 5000),
            'origin': random.choice(["LHR", "JFK", "FRA", "DXB", "HKG"]),
            'status': 'pending'
        })
    return pd.DataFrame(data)

def generate_capacity_utilization(rows=100):
    timestamps = pd.date_range(end=datetime.now(), periods=rows, freq='2H')
    return pd.DataFrame({
        'timestamp': timestamps,
        'warehouse_utilization_pct': np.clip(np.random.normal(70, 15, len(timestamps)), 0, 100),
        'labor_shift_load_pct': np.clip(np.random.normal(60, 20, len(timestamps)), 0, 100)
    })
