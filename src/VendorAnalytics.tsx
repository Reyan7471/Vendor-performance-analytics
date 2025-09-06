import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Star, 
  Download,
  RefreshCw,
  Search
} from "lucide-react";

interface VendorData {
  id: string;
  name: string;
  category: string;
  contactEmail: string;
  contactPhone: string;
  performance: number;
  revenue: number;
  deliveryTime: number;
  rating: number;
  orders: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  contractStart: string;
  contractEnd: string;
  riskLevel: 'low' | 'medium' | 'high';
  location: string;
  lastOrderDate: string;
  paymentTerms: string;
  notes: string;
}

const initialVendorData: VendorData[] = [
  {
    id: "1",
    name: "TechSupply Co.",
    category: "Technology",
    contactEmail: "contact@techsupply.com",
    contactPhone: "+1-555-0123",
    performance: 92,
    revenue: 45000,
    deliveryTime: 2.1,
    rating: 4.8,
    orders: 156,
    status: 'excellent',
    contractStart: "2023-01-15",
    contractEnd: "2024-12-31",
    riskLevel: 'low',
    location: "New York, USA",
    lastOrderDate: "2024-01-20",
    paymentTerms: "Net 30",
    notes: "Reliable partner with excellent delivery track record."
  },
  {
    id: "2", 
    name: "Global Solutions Ltd.",
    category: "Manufacturing",
    contactEmail: "sales@globalsolutions.com",
    contactPhone: "+1-555-0456",
    performance: 87,
    revenue: 38500,
    deliveryTime: 3.2,
    rating: 4.5,
    orders: 134,
    status: 'good',
    contractStart: "2023-03-10",
    contractEnd: "2024-09-30",
    riskLevel: 'low',
    location: "Chicago, USA",
    lastOrderDate: "2024-01-18",
    paymentTerms: "Net 45",
    notes: "Good quality products, occasional delivery delays."
  },
  {
    id: "3",
    name: "Prime Vendors Inc.",
    category: "Services",
    contactEmail: "info@primevendors.com",
    contactPhone: "+1-555-0789",
    performance: 76,
    revenue: 28900,
    deliveryTime: 4.1,
    rating: 4.2,
    orders: 98,
    status: 'average',
    contractStart: "2023-05-20",
    contractEnd: "2024-05-19",
    riskLevel: 'medium',
    location: "Denver, USA",
    lastOrderDate: "2024-01-15",
    paymentTerms: "Net 60",
    notes: "Average performance, needs improvement in delivery times."
  },
  {
    id: "4",
    name: "Quick Ship Express",
    category: "Logistics",
    contactEmail: "orders@quickship.com",
    contactPhone: "+1-555-0321",
    performance: 94,
    revenue: 52000,
    deliveryTime: 1.8,
    rating: 4.9,
    orders: 189,
    status: 'excellent',
    contractStart: "2023-02-01",
    contractEnd: "2025-01-31",
    riskLevel: 'low',
    location: "Los Angeles, USA",
    lastOrderDate: "2024-01-22",
    paymentTerms: "Net 15",
    notes: "Outstanding logistics partner with fastest delivery times."
  },
  {
    id: "5",
    name: "Budget Suppliers",
    category: "Raw Materials",
    contactEmail: "support@budgetsuppliers.com",
    contactPhone: "+1-555-0654",
    performance: 65,
    revenue: 19500,
    deliveryTime: 5.2,
    rating: 3.8,
    orders: 72,
    status: 'poor',
    contractStart: "2023-08-15",
    contractEnd: "2024-08-14",
    riskLevel: 'high',
    location: "Phoenix, USA",
    lastOrderDate: "2024-01-10",
    paymentTerms: "Net 90",
    notes: "Low-cost option but frequently misses delivery deadlines."
  },
  {
    id: "6",
    name: "Elite Manufacturing",
    category: "Manufacturing",
    contactEmail: "contact@elitemfg.com",
    contactPhone: "+1-555-0987",
    performance: 89,
    revenue: 41200,
    deliveryTime: 2.8,
    rating: 4.6,
    orders: 142,
    status: 'good',
    contractStart: "2023-06-01",
    contractEnd: "2024-11-30",
    riskLevel: 'low',
    location: "Seattle, USA",
    lastOrderDate: "2024-01-19",
    paymentTerms: "Net 30",
    notes: "High-quality manufacturing with consistent performance."
  }
];

const VendorAnalytics: React.FC = () => {
  const [vendors] = useState<VendorData[]>(initialVendorData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState<VendorData[]>(initialVendorData);

  useEffect(() => {
    let filtered = [...vendors];
    
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredVendors(filtered);
  }, [vendors, searchTerm]);

  // Calculate metrics
  const totalRevenue = filteredVendors.reduce((sum, vendor) => sum + vendor.revenue, 0);
  const avgPerformance = filteredVendors.length > 0 ? 
    filteredVendors.reduce((sum, vendor) => sum + vendor.performance, 0) / filteredVendors.length : 0;
  const totalOrders = filteredVendors.reduce((sum, vendor) => sum + vendor.orders, 0);
  const avgRating = filteredVendors.length > 0 ? 
    filteredVendors.reduce((sum, vendor) => sum + vendor.rating, 0) / filteredVendors.length : 0;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200 px-2 py-1 rounded border text-xs font-medium';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200 px-2 py-1 rounded border text-xs font-medium';
      case 'average': return 'text-yellow-600 bg-yellow-50 border-yellow-200 px-2 py-1 rounded border text-xs font-medium';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200 px-2 py-1 rounded border text-xs font-medium';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 px-2 py-1 rounded border text-xs font-medium';
    }
  };

  const getPerformanceIcon = (performance: number) => {
    return performance >= 80 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Vendor Performance Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive vendor management and performance tracking
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => alert("Data refreshed!")} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              onClick={() => alert("Data exported!")} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">+12.5% from last period</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                  <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
                  <p className="text-xs text-blue-600 mt-1">+3.2% improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
                  <p className="text-xs text-purple-600 mt-1">+8.7% increase</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                  <p className="text-xs text-yellow-600 mt-1">+0.3 improvement</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendor Grid */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Vendor Details ({filteredVendors.length})</CardTitle>
              <div className="text-sm text-gray-600">
                Showing {filteredVendors.length} of {vendors.length} vendors
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">{vendor.category}</p>
                        <p className="text-xs text-gray-500">{vendor.location}</p>
                      </div>
                      <span className={getStatusColor(vendor.status)}>
                        {vendor.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Performance</span>
                        <div className="flex items-center gap-2">
                          {getPerformanceIcon(vendor.performance)}
                          <span className="font-semibold">{vendor.performance}%</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${vendor.performance}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-semibold">${vendor.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Orders</p>
                          <p className="font-semibold">{vendor.orders}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{vendor.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Delivery</p>
                          <p className="font-semibold">{vendor.deliveryTime} days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorAnalytics;