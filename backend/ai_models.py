from sklearn.ensemble import IsolationForest
import numpy as np

def run_energy_anomaly_detection(df):
    model = IsolationForest(contamination=0.05, random_state=42)
    # Prepare features
    X = df[['energy_kwh', 'equipment_active', 'trucks_active']].values
    preds = model.fit_predict(X)
    
    # 1 for normal, -1 for anomaly
    df['is_anomaly'] = (preds == -1).astype(int)
    return df

def run_security_nlp_analysis(df):
    # Rule-based / heuristics NLP for scoring
    high_risk_keywords = ["hazardous", "leak", "missing", "unlabeled", "explosive", "suspect"]
    
    risk_scores = []
    alerts = []
    recommendations = []
    
    for desc in df['description']:
        desc_lower = desc.lower()
        score = 0.1 # base
        for kw in high_risk_keywords:
            if kw in desc_lower:
                score += 0.4
        
        score += np.random.uniform(0, 0.2) # noise
        score = min(score, 1.0)
        risk_scores.append(score)
        
        if score > 0.6:
            rec = "Hold for Inspection - Do Not Load"
        else:
            rec = "Cleared for Loading"
        recommendations.append(rec)
    
    df['risk_score'] = risk_scores
    df['recommendation'] = recommendations
    return df

def run_demand_forecast(df, steps=7):
    # simple linear continuation + recent mean for demo purposes
    last_val = df['cargo_volume_tons'].iloc[-1]
    trend = np.mean(np.diff(df['cargo_volume_tons'].values)) if len(df) > 1 else 0
    predictions = []
    current = last_val
    for i in range(steps):
        current += trend + np.random.normal(0, 5)
        predictions.append(max(current, 0))
    return predictions
