import React, { useState, useEffect, useContext } from 'react';
import {
  Activity,
  CreditCard,
  TrendingUp,
  Image,
  Wand2,
  Scissors,
  Eraser,
  Expand,
  Palette,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LayoutGrid,
  List,
  Clock
} from 'lucide-react';
import { AppContext } from '../contexts/AppContext';
import MobileBackArrow from "../components/MobileArrow";

const Dashboard = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [toolUsageHistory, setToolUsageHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionPage, setTransactionPage] = useState(1);

  const toolIcons = {
    generateImage: { icon: Wand2, color: 'from-purple-500 to-pink-500', text: 'text-purple-400', bg: 'bg-purple-500/10' },
    removeBackground: { icon: Scissors, color: 'from-blue-500 to-cyan-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
    enhanceImage: { icon: Sparkles, color: 'from-green-500 to-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    removeText: { icon: Eraser, color: 'from-orange-500 to-red-500', text: 'text-orange-400', bg: 'bg-orange-500/10' },
    replaceBackground: { icon: Palette, color: 'from-indigo-500 to-purple-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    uncropImage: { icon: Expand, color: 'from-pink-500 to-rose-500', text: 'text-pink-400', bg: 'bg-pink-500/10' },
    cleanup: { icon: Activity, color: 'from-yellow-500 to-orange-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10' }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  useEffect(() => {
    if (token && activeTab === 'transactions') {
      fetchTransactions(transactionPage);
    }
  }, [token, activeTab, transactionPage]);

  useEffect(() => {
    if (token && activeTab === 'activity') {
      fetchToolUsageHistory(currentPage);
    }
  }, [token, activeTab, currentPage]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/dashboard/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setDashboardData(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (page) => {
    try {
      const response = await fetch(`${backendUrl}/api/dashboard/transactions?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchToolUsageHistory = async (page) => {
    try {
      const response = await fetch(`${backendUrl}/api/dashboard/tool-usage?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setToolUsageHistory(result.data);
      }
    } catch (error) {
      console.error('Error fetching tool usage:', error);
    }
  };

  const formatToolName = (name) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="group bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-black/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-semibold text-white tracking-tight">{value || 0}</h3>
        </div>
        <div className="bg-zinc-800/50 p-3 rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-zinc-300" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          <p className="text-zinc-500 text-sm animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white pt-16 font-sans">
      <MobileBackArrow  />
      {/* Background Gradient Spot */}
      <div className="fixed top-0 left-0 w-full h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-black to-black pointer-events-none z-0" />

      {/* Header */}
      <div className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
              <p className="text-zinc-500 text-sm mt-1">Overview of your creative activity</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Plan Status</p>
                <p className="text-emerald-500 text-xs font-medium flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Active
                </p>
              </div>
              <div className="bg-zinc-900/80 border border-white/10 rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-inner">
                <div className="p-1.5 bg-white/5 rounded-lg">
                  <CreditCard className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Credits</p>
                  <p className="text-white text-lg font-bold leading-none">{dashboardData?.user?.currentCredits || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 mt-2">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutGrid },
              { id: 'transactions', label: 'Transactions', icon: List },
              { id: 'activity', label: 'Activity ', icon: Clock }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-sm font-medium transition-all relative border-b-2 ${
                    activeTab === tab.id
                      ? 'text-white border-white'
                      : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:border-zinc-800'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-zinc-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && dashboardData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Current Balance"
                value={dashboardData.stats.currentCredits}
                icon={CreditCard}
              />
              <StatCard
                title="Tools Used"
                value={dashboardData.stats.totalToolsUsed}
                icon={Activity}
              />
              <StatCard
                title="Total Purchased"
                value={dashboardData.stats.totalCreditsPurchased}
                icon={TrendingUp}
              />
              <StatCard
                title="Transactions"
                value={dashboardData.stats.totalTransactions}
                icon={Image}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tool Usage Breakdown */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                   <h2 className="text-lg font-semibold text-white">Tool Usage</h2>
                </div>
                
                {dashboardData.toolUsageBreakdown && dashboardData.toolUsageBreakdown.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData.toolUsageBreakdown.map((tool, index) => {
                      const toolConfig = toolIcons[tool._id] || { icon: Activity, color: 'from-gray-500 to-gray-600', text: 'text-gray-400', bg: 'bg-gray-500/10' };
                      const Icon = toolConfig.icon;
                      return (
                        <div key={index} className="group bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-default">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`${toolConfig.bg} p-2.5 rounded-lg group-hover:scale-105 transition-transform`}>
                                <Icon className={`w-5 h-5 ${toolConfig.text}`} />
                              </div>
                              <div>
                                <h4 className="text-zinc-200 font-medium text-sm">{formatToolName(tool._id)}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="h-1.5 w-16 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-zinc-500 rounded-full" style={{ width: '60%'}}></div>
                                    </div>
                                    <p className="text-zinc-500 text-xs">{tool.count} runs</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-mono font-medium">{tool.creditsSpent}</p>
                              <p className="text-zinc-600 text-[10px] uppercase tracking-wider">Credits</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-12 text-center border-dashed">
                    <Activity className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                    <p className="text-zinc-500">No usage data available yet.</p>
                  </div>
                )}
              </div>

              {/* Recent Activity Mini List */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-semibold text-white mb-5">Recent Activity</h2>
                {dashboardData.recentActivity && dashboardData.recentActivity.length > 0 ? (
                  <div className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className={`p-4 flex items-center justify-between hover:bg-white/5 transition-colors group ${
                          index !== dashboardData.recentActivity.length - 1 ? 'border-b border-white/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                          <div className="min-w-0">
                            <p className="text-zinc-300 text-sm font-medium truncate group-hover:text-white transition-colors">{formatToolName(activity.toolName)}</p>
                            <p className="text-zinc-600 text-xs">{formatTime(activity.createdAt)}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                          -{activity.creditsUsed}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                    <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-8 text-center border-dashed h-[200px] flex flex-col justify-center items-center">
                        <p className="text-zinc-600 text-sm">No recent activity</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-semibold text-white mb-4">Transaction History</h2>

            {transactions.transactions && transactions.transactions.length > 0 ? (
              <>
                <div className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Credits</th>
                        <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {transactions.transactions.map((transaction) => (
                        <tr key={transaction._id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-sm text-zinc-300 group-hover:text-white">{formatDate(transaction.date)}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                              {transaction.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-emerald-400 font-medium">+{transaction.credits}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">₹{transaction.amount / 100}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {transactions.pagination && transactions.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <p className="text-zinc-500 text-sm">
                       {((transactions.pagination.currentPage - 1) * transactions.pagination.limit) + 1}-
                      {Math.min(transactions.pagination.currentPage * transactions.pagination.limit, transactions.pagination.totalTransactions)} of {transactions.pagination.totalTransactions}
                    </p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setTransactionPage(p => Math.max(1, p - 1))}
                        disabled={transactionPage === 1}
                        className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-zinc-400 text-sm px-2">Page {transactionPage} / {transactions.pagination.totalPages}</span>
                      <button 
                        onClick={() => setTransactionPage(p => Math.min(transactions.pagination.totalPages, p + 1))}
                        disabled={transactionPage === transactions.pagination.totalPages}
                        className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-16 text-center border-dashed">
                <CreditCard className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                <h3 className="text-zinc-200 text-lg font-medium mb-1">No Transactions</h3>
                <p className="text-zinc-500 text-sm">Your purchase history will appear here once you make a purchase.</p>
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-lg font-semibold text-white mb-4">Detailed Activity Log</h2>

            {toolUsageHistory.toolUsages && toolUsageHistory.toolUsages.length > 0 ? (
              <>
                <div className="grid gap-3">
                  {toolUsageHistory.toolUsages.map((activity, index) => {
                    const toolConfig = toolIcons[activity.toolName] || { icon: Activity, color: 'from-gray-500 to-gray-600', text: 'text-gray-400', bg: 'bg-gray-500/10' };
                    const Icon = toolConfig.icon;
                    return (
                      <div key={index} className="group bg-zinc-900/40 border border-white/5 rounded-xl p-5 hover:border-white/10 hover:bg-zinc-900/60 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`${toolConfig.bg} p-2.5 rounded-lg mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className={`w-5 h-5 ${toolConfig.text}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-zinc-200 font-medium">{formatToolName(activity.toolName)}</h4>
                              {activity.prompt && (
                                <p className="text-zinc-500 text-sm mt-1 line-clamp-2 leading-relaxed italic">
                                  "{activity.prompt}"
                                </p>
                              )}
                              <div className="flex items-center gap-3 mt-3">
                                <span className="text-zinc-600 text-xs flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded">
                                   <Clock className="w-3 h-3" /> {formatTime(activity.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-zinc-400 text-sm font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5">
                              {activity.creditsUsed} credit
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {toolUsageHistory.pagination && toolUsageHistory.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <p className="text-zinc-500 text-sm">
                      Showing {((toolUsageHistory.pagination.currentPage - 1) * toolUsageHistory.pagination.limit) + 1}-
                      {Math.min(toolUsageHistory.pagination.currentPage * toolUsageHistory.pagination.limit, toolUsageHistory.pagination.totalUsages)} of {toolUsageHistory.pagination.totalUsages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-zinc-400 text-sm px-2">Page {currentPage} / {toolUsageHistory.pagination.totalPages}</span>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(toolUsageHistory.pagination.totalPages, p + 1))}
                        disabled={currentPage === toolUsageHistory.pagination.totalPages}
                        className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-16 text-center border-dashed">
                <Activity className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                <h3 className="text-zinc-200 text-lg font-medium mb-1">No Activity Yet</h3>
                <p className="text-zinc-500 text-sm">Start using tools to see your detailed logs here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;