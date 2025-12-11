"use client";

import { AdminHeader } from "@/components/layout/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Building2,
  Clock,
  CheckCheck,
  Filter,
  Plus,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import masterData from "@/lib/data/master-data.json";

interface Message {
  id: number;
  sender: "admin" | "company";
  content: string;
  timestamp: string;
  read: boolean;
}

interface Thread {
  id: number;
  companyId: number;
  companyName: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const mockThreads: Thread[] = [
  {
    id: 1,
    companyId: 1,
    companyName: "Tullow Ghana Limited",
    subject: "Drilling Permit Renewal - Urgent",
    lastMessage: "Thank you for the update. We will submit the required documents by Friday.",
    lastMessageTime: "2024-12-10T14:30:00",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "admin",
        content: "Good morning. Your drilling permit DP-2024-045 is set to expire on December 31st. Please begin the renewal process.",
        timestamp: "2024-12-10T09:00:00",
        read: true,
      },
      {
        id: 2,
        sender: "company",
        content: "Good morning. We acknowledge receipt of this notice. What documents are required for the renewal?",
        timestamp: "2024-12-10T09:45:00",
        read: true,
      },
      {
        id: 3,
        sender: "admin",
        content: "You'll need:\n1. Updated safety compliance certificate\n2. Environmental impact assessment\n3. Proof of insurance\n4. Renewal application form (Form DP-REN-001)\n\nAll documents should be submitted through the portal by December 20th.",
        timestamp: "2024-12-10T10:15:00",
        read: true,
      },
      {
        id: 4,
        sender: "company",
        content: "Thank you for the update. We will submit the required documents by Friday.",
        timestamp: "2024-12-10T14:30:00",
        read: false,
      },
    ],
  },
  {
    id: 6,
    companyId: 1,
    companyName: "Tullow Ghana Limited",
    subject: "Q4 2024 Production Data Submission",
    lastMessage: "The production data has been uploaded to the portal.",
    lastMessageTime: "2024-12-09T16:45:00",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "admin",
        content: "Good afternoon. This is a reminder that Q4 2024 production data is due by December 15th. Please ensure all fields are completed accurately.",
        timestamp: "2024-12-09T10:00:00",
        read: true,
      },
      {
        id: 2,
        sender: "company",
        content: "Acknowledged. We're currently compiling the data from all our fields. Should be ready by end of week.",
        timestamp: "2024-12-09T14:20:00",
        read: true,
      },
      {
        id: 3,
        sender: "company",
        content: "The production data has been uploaded to the portal.",
        timestamp: "2024-12-09T16:45:00",
        read: true,
      },
    ],
  },
  {
    id: 7,
    companyId: 1,
    companyName: "Tullow Ghana Limited",
    subject: "Safety Inspection Schedule - January 2025",
    lastMessage: "January 15th works perfectly for us.",
    lastMessageTime: "2024-12-08T11:30:00",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: "admin",
        content: "Hello. We're scheduling safety inspections for January 2025. We have availability on January 15th or January 22nd. Which date works better for your team?",
        timestamp: "2024-12-08T09:15:00",
        read: true,
      },
      {
        id: 2,
        sender: "company",
        content: "January 15th works perfectly for us. We'll have our safety team and facility managers available that day.",
        timestamp: "2024-12-08T11:30:00",
        read: false,
      },
    ],
  },
  {
    id: 2,
    companyId: 4,
    companyName: "Springfield E&P",
    subject: "Q3 2024 Production Report - Clarification Needed",
    lastMessage: "We've reviewed the report. Section 3.2 needs additional data on local content procurement.",
    lastMessageTime: "2024-12-10T11:20:00",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "admin",
        content: "Good afternoon. We've reviewed your Q3 2024 Production Report. We need clarification on some figures in Section 3.2 regarding local content procurement.",
        timestamp: "2024-12-09T15:30:00",
        read: true,
      },
      {
        id: 2,
        sender: "company",
        content: "Hello. Could you please specify which figures need clarification? We want to ensure we provide the correct information.",
        timestamp: "2024-12-09T16:45:00",
        read: true,
      },
      {
        id: 3,
        sender: "admin",
        content: "We've reviewed the report. Section 3.2 needs additional data on local content procurement. Specifically:\n- Breakdown of Ghanaian suppliers by category\n- Total value of contracts awarded to local companies\n- Employment figures for Ghanaian nationals",
        timestamp: "2024-12-10T11:20:00",
        read: true,
      },
    ],
  },
  {
    id: 3,
    companyId: 2,
    companyName: "ENI Ghana",
    subject: "Environmental Compliance Certificate Approved",
    lastMessage: "Your Environmental Compliance Certificate has been approved. Certificate number: EC-2024-ENI-089",
    lastMessageTime: "2024-12-09T16:00:00",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "company",
        content: "Good morning. We submitted our Environmental Compliance Report last week. Could you provide an update on the approval status?",
        timestamp: "2024-12-08T10:00:00",
        read: true,
      },
      {
        id: 2,
        sender: "admin",
        content: "Good afternoon. Your report is currently under review by our environmental team. We expect to complete the review by end of week.",
        timestamp: "2024-12-08T14:30:00",
        read: true,
      },
      {
        id: 3,
        sender: "admin",
        content: "Your Environmental Compliance Certificate has been approved. Certificate number: EC-2024-ENI-089. The certificate is valid until December 2025. You can download it from the portal.",
        timestamp: "2024-12-09T16:00:00",
        read: true,
      },
    ],
  },
  {
    id: 4,
    companyId: 3,
    companyName: "Kosmos Energy",
    subject: "Annual Local Content Performance Report Due",
    lastMessage: "This is a reminder that your Annual Local Content Performance Report is due on December 31st.",
    lastMessageTime: "2024-12-09T09:00:00",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: "admin",
        content: "This is a reminder that your Annual Local Content Performance Report is due on December 31st. Please ensure all sections are completed and supporting documents are attached.",
        timestamp: "2024-12-09T09:00:00",
        read: false,
      },
    ],
  },
  {
    id: 5,
    companyId: 7,
    companyName: "GNPC (Ghana National Petroleum Corporation)",
    subject: "National Production Summary - Request for Data",
    lastMessage: "We'll compile the data and have it ready by Monday morning.",
    lastMessageTime: "2024-12-08T15:45:00",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "admin",
        content: "Good morning. We're preparing the Q4 national production summary. Could you please provide the latest production figures from all GNPC-operated fields?",
        timestamp: "2024-12-08T10:00:00",
        read: true,
      },
      {
        id: 2,
        sender: "company",
        content: "Good morning. Yes, we can provide that data. Do you need daily averages or cumulative quarterly figures?",
        timestamp: "2024-12-08T11:30:00",
        read: true,
      },
      {
        id: 3,
        sender: "admin",
        content: "Both would be ideal - daily averages and quarterly cumulative. Also include any notable operational events or downtime.",
        timestamp: "2024-12-08T13:00:00",
        read: true,
      },
      {
        id: 4,
        sender: "company",
        content: "We'll compile the data and have it ready by Monday morning.",
        timestamp: "2024-12-08T15:45:00",
        read: true,
      },
    ],
  },
];

export default function MessagingPage() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { companies } = masterData;

  // Group threads by company
  const getCompanyThreads = (companyId: number) => {
    return mockThreads.filter((thread) => thread.companyId === companyId);
  };

  // Get unread count per company
  const getCompanyUnreadCount = (companyId: number) => {
    return getCompanyThreads(companyId).reduce((acc, thread) => acc + thread.unreadCount, 0);
  };

  // Filter companies that have threads
  const companiesWithThreads = companies.filter((company) =>
    getCompanyThreads(company.id).length > 0
  );

  const filteredCompanies = companiesWithThreads.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentCompanyThreads = selectedCompany ? getCompanyThreads(selectedCompany) : [];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedThread) {
      // Add message to thread (in real app, this would call an API)
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader title="Messaging" />

      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Companies List */}
        <div className="w-72 border-r bg-muted/30 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b space-y-3">
            <h2 className="font-semibold text-lg">Companies</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Companies List */}
          <div className="flex-1 overflow-y-auto">
            {filteredCompanies.map((company) => {
              const unreadCount = getCompanyUnreadCount(company.id);
              const isSelected = selectedCompany === company.id;

              return (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                    isSelected && "bg-muted border-l-4 border-l-primary"
                  )}
                  onClick={() => {
                    setSelectedCompany(company.id);
                    setSelectedThread(null);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{company.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {getCompanyThreads(company.id).length} conversation{getCompanyThreads(company.id).length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    {unreadCount > 0 && (
                      <Badge className="bg-blue-500 text-white h-5 min-w-5 flex items-center justify-center px-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Threads List (shows when company is selected) */}
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 border-r bg-background flex flex-col"
          >
            {/* Threads Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">
                  {companies.find((c) => c.id === selectedCompany)?.name}
                </h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {currentCompanyThreads.length} conversation{currentCompanyThreads.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Threads List */}
            <div className="flex-1 overflow-y-auto">
              {currentCompanyThreads.map((thread) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                    selectedThread?.id === thread.id && "bg-muted/50 border-l-4 border-l-primary"
                  )}
                  onClick={() => setSelectedThread(thread)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate mb-1">{thread.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {thread.lastMessage}
                      </p>
                    </div>
                    {thread.unreadCount > 0 && (
                      <Badge className="bg-blue-500 text-white h-5 min-w-5 flex items-center justify-center px-1.5 ml-2">
                        {thread.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTime(thread.lastMessageTime)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Column 3: Message Thread View */}
        {selectedThread ? (
          <div className="flex-1 flex flex-col">
            {/* Thread Header */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{selectedThread.companyName}</h2>
                  <p className="text-sm text-muted-foreground">{selectedThread.subject}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/20">
              {selectedThread.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex gap-3",
                    message.sender === "admin" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "company" && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg p-4",
                      message.sender === "admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div
                      className={cn(
                        "flex items-center gap-2 mt-2 text-xs",
                        message.sender === "admin"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === "admin" && (
                        <CheckCheck className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                  {message.sender === "admin" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold text-sm">
                      A
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex items-end gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[60px] max-h-[200px] resize-none"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="h-[60px]"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {selectedCompany ? "Select a conversation" : "Select a company"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedCompany
                  ? "Choose a conversation from the list to start messaging"
                  : "Select a company to view conversations"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
