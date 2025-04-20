import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  AlertTriangle, 
  Check, 
  AlertCircle, 
  Battery, 
  Thermometer, 
  Activity, 
  BarChart3, 
  Clock, 
  Car, 
  Gauge, 
  Wrench,
  Settings 
} from 'lucide-react';

// Mock data for demonstration
const mockHistoricalData = [
  { date: 'Jan', temperature: 85, vibration: 12, rpm: 2100 },
  { date: 'Feb', temperature: 88, vibration: 14, rpm: 2150 },
  { date: 'Mar', temperature: 86, vibration: 15, rpm: 2200 },
  { date: 'Apr', temperature: 92, vibration: 18, rpm: 2250, anomaly: true },
  { date: 'May', temperature: 90, vibration: 16, rpm: 2180 },
  { date: 'Jun', temperature: 89, vibration: 15, rpm: 2160 },
];

export default function VehicleHealthDashboard() {
  const [vehicleStatus, setVehicleStatus] = useState('good'); // good, warning, critical
  const [nextMaintenance, setNextMaintenance] = useState('May 15, 2025');
  const [drivingScore, setDrivingScore] = useState(87);
  const [vehicleModel, setVehicleModel] = useState('Tesla Model S');
  const [mileage, setMileage] = useState(34567);
  
  // Predictive insights data
  const [brakePadLife, setBrakePadLife] = useState(72);
  const [brakeDistanceLeft, setBrakeDistanceLeft] = useState(18500);
  const [treadDepth, setTreadDepth] = useState(6.5);
  const [batteryHealth, setBatteryHealth] = useState(92);
  const [batteryFailureLikelihood, setBatteryFailureLikelihood] = useState(8);
  const [oilQuality, setOilQuality] = useState(65);
  
  // Status color mapping
  const statusColors = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-600'
  };

  const statusGradients = {
    good: 'from-emerald-400 to-emerald-600',
    warning: 'from-amber-400 to-amber-600',
    critical: 'from-rose-500 to-rose-700'
  };

  const StatusIcon = () => {
    if (vehicleStatus === 'good') return <Check className="h-6 w-6 text-white" />;
    if (vehicleStatus === 'warning') return <AlertTriangle className="h-6 w-6 text-white" />;
    return <AlertCircle className="h-6 w-6 text-white" />;
  };

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = Math.random() > 0.7;
      if (randomChange) {
        setBrakePadLife(prev => Math.max(prev - Math.random() * 2, 0));
        setTreadDepth(prev => Math.max(prev - Math.random() * 0.1, 0));
        setBatteryHealth(prev => Math.max(prev - Math.random() * 0.5, 0));
        setOilQuality(prev => Math.max(prev - Math.random() * 1, 0));
        setMileage(prev => prev + Math.floor(Math.random() * 5));
        
        // Update overall status based on component health
        if (brakePadLife < 20 || batteryHealth < 40 || oilQuality < 20) {
          setVehicleStatus('critical');
        } else if (brakePadLife < 40 || batteryHealth < 60 || oilQuality < 40) {
          setVehicleStatus('warning');
        } else {
          setVehicleStatus('good');
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [brakePadLife, batteryHealth, oilQuality]);

  // Helper to determine health status color
  const getHealthColor = (value) => {
    if (value > 70) return 'text-emerald-500';
    if (value > 40) return 'text-amber-500';
    return 'text-rose-600';
  };

  const getHealthGradient = (value) => {
    if (value > 70) return 'from-emerald-400 to-emerald-600';
    if (value > 40) return 'from-amber-400 to-amber-600';
    return 'from-rose-500 to-rose-700';
  };

  return (
    <div className="bg-white min-h-screen p-4 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header with vehicle info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Car className="h-10 w-10 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{vehicleModel}</h1>
              <div className="flex items-center mt-1">
                <Gauge className="h-4 w-4 mr-1 text-blue-600" />
                <span className="text-gray-600 text-sm mr-4">{mileage.toLocaleString()} km</span>
                <div className={`w-2 h-2 rounded-full ${statusColors[vehicleStatus]} mr-1`}></div>
                <span className={`text-sm capitalize ${getHealthColor(vehicleStatus === 'good' ? 100 : vehicleStatus === 'warning' ? 50 : 20)}`}>
                  {vehicleStatus}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
              <Wrench className="h-4 w-4 mr-2" />
              Schedule Service
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
        
        {/* Overview / Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`bg-gradient-to-br ${statusGradients[vehicleStatus]} rounded-xl shadow-md p-6 flex items-center`}>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <StatusIcon />
            </div>
            <div>
              <p className="text-white text-opacity-80">Vehicle Health</p>
              <h3 className="text-2xl font-bold text-white capitalize">{vehicleStatus}</h3>
              <p className="text-sm text-white text-opacity-70">
                {vehicleStatus === 'good' 
                  ? 'All systems functioning properly' 
                  : vehicleStatus === 'warning' 
                  ? 'Maintenance recommended soon' 
                  : 'Immediate attention required'}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500">Next Maintenance</p>
              <h3 className="text-2xl font-bold text-gray-800">{nextMaintenance}</h3>
              <p className="text-sm text-gray-500">Regular service check</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500">Driving Score</p>
              <h3 className="text-2xl font-bold text-gray-800">{drivingScore}/100</h3>
              <p className="text-sm text-gray-500">Above average efficiency</p>
            </div>
          </div>
        </div>
        
        {/* Predictive Insights */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-600" /> 
            Predictive Component Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brake Pad Wear */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Brake System
              </h3>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Brake Pad Life</span>
                  <span className={`text-sm font-semibold ${getHealthColor(brakePadLife)}`}>
                    {brakePadLife}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full bg-gradient-to-r ${getHealthGradient(brakePadLife)}`} 
                    style={{ width: `${brakePadLife}%` }}
                  >
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated {brakeDistanceLeft} km remaining</span>
                {brakePadLife < 40 && (
                  <span className="text-amber-500 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" /> Anomalies detected
                  </span>
                )}
              </div>
            </div>
            
            {/* Tire Health */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Tire Health
              </h3>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tread Depth</p>
                  <p className={`text-xl font-semibold ${getHealthColor(treadDepth * 12)}`}>
                    {treadDepth.toFixed(1)} <span className="text-sm">mm</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pressure</p>
                  <p className="text-xl font-semibold text-emerald-500">32 <span className="text-sm">PSI</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Balance</p>
                  <p className="text-xl font-semibold text-emerald-500">Good</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className={`h-2.5 rounded-full bg-gradient-to-r ${getHealthGradient(treadDepth * 12)}`} 
                  style={{ width: `${(treadDepth/8)*100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Battery Health */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Battery Systems
              </h3>
              <div className="flex items-center mb-4">
                <Battery className={`h-8 w-8 mr-4 ${getHealthColor(batteryHealth)}`} />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Health Status</span>
                    <span className={`text-sm font-semibold ${getHealthColor(batteryHealth)}`}>{batteryHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full bg-gradient-to-r ${getHealthGradient(batteryHealth)}`} 
                      style={{ width: `${batteryHealth}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Charge Cycles</p>
                  <p className="text-lg font-semibold text-gray-800">248</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Failure Risk</p>
                  <p className={`text-lg font-semibold ${batteryFailureLikelihood > 20 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {batteryFailureLikelihood}%
                  </p>
                </div>
              </div>
            </div>
            
            {/* Engine & Transmission */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                Engine & Transmission
              </h3>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Oil Quality</span>
                  <span className={`text-sm font-semibold ${getHealthColor(oilQuality)}`}>{oilQuality}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full bg-gradient-to-r ${getHealthGradient(oilQuality)}`} 
                    style={{ width: `${oilQuality}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Engine Vibration</p>
                  <p className={`text-lg font-semibold ${oilQuality < 40 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {oilQuality < 40 ? 'Abnormal' : 'Normal'}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Transmission</p>
                  <p className="text-lg font-semibold text-emerald-500">Normal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sensor Data Visualization */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" /> 
            Real-Time Sensor Analytics
          </h2>
          <div className="h-64 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockHistoricalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Temperature" />
                <Line type="monotone" dataKey="vibration" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Vibration" />
                <Line type="monotone" dataKey="rpm" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="RPM" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <Thermometer className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Engine Temperature</p>
                <div className="flex items-baseline">
                  <p className="text-xl font-bold text-gray-800">90°C</p>
                  <span className="ml-2 text-emerald-500 text-sm">Normal</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Vibration Level</p>
                <div className="flex items-baseline">
                  <p className="text-xl font-bold text-gray-800">16 Hz</p>
                  <span className="ml-2 text-emerald-500 text-sm">Normal</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Battery className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Battery Voltage</p>
                <div className="flex items-baseline">
                  <p className="text-xl font-bold text-gray-800">12.7V</p>
                  <span className="ml-2 text-emerald-500 text-sm">Good</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-medium mb-3 text-amber-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" /> AI Detected Anomalies
            </h3>
            <div className="text-sm">
              <p className="text-amber-600 mb-2">
                Unusual temperature spike detected in April
              </p>
              <p className="text-gray-700">Recommendation: Monitor engine cooling system for potential fan or thermostat issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}