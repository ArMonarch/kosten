"use client";
import { Button } from "@/components/button";
import { BadgeDollarSign, BanknoteArrowDown, BanknoteArrowUp, ChevronRight, LayoutDashboard, LogOut, Plus, WalletMinimal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/sidebar";
import { User } from "@/types/user";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "../dialog";
import { Form, FormType } from "../form/transaction/form";

type varient = "Dashboard" | "Transaction" | "Income" | "Expense";
function Dashboard({ user, logout, varient, createFunction, children }: { user: User | null, logout: () => void, varient: varient, createFunction?: (formstate: FormType) => Promise<void>, children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <WalletMinimal className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-black"><Link href="/">Kosten</Link></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold">Welcome, <span className="text-primary">{user?.name}</span>!</div>
            <Button variant="outline" size="default" className="rounded-3xl hover:bg-primary!" onClick={logout}>logout</Button>
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-row">
        <SidebarProvider>
          <div className="flex w-full">
            <Sidebar variant="floating" collapsible="icon" className="border rounded-r-xl mt-19 h-[53rem]">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarMenu>
                    <Link href="/dashboard/dashboard">
                      <SidebarMenuButton>
                        <LayoutDashboard />
                        <SidebarMenuItem>Dashboard</SidebarMenuItem>
                      </SidebarMenuButton>
                    </Link>

                    <Link href="/dashboard/transactions">
                      <SidebarMenuButton>
                        <BadgeDollarSign />
                        <SidebarMenuItem>Transactions</SidebarMenuItem>
                      </SidebarMenuButton>
                    </Link>

                    <Link href="/dashboard/expenses">
                      <SidebarMenuButton>
                        <BanknoteArrowDown />
                        <SidebarMenuItem>Expenses</SidebarMenuItem>
                      </SidebarMenuButton>
                    </Link>

                    <Link href="/dashboard/incomes">
                      <SidebarMenuButton>
                        <BanknoteArrowUp />
                        <SidebarMenuItem>Incomes</SidebarMenuItem>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter className="flex justify-center">
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <SidebarMenuItem>Log Out</SidebarMenuItem>
                </SidebarMenuButton>
              </SidebarFooter>
            </Sidebar>

            {/* Main */}
            <main className="flex flex-col px-3 w-full">
              <div className="flex flex-row items-center">
                <div className="flex flex-row gap-3 justify-center items-center">
                  <SidebarTrigger />
                  <span>{user?.name}</span>
                  <span><ChevronRight /></span>
                  <span>Dashboard</span>
                  <span><ChevronRight /></span>
                  <span>{varient}</span>
                </div>
                <div className="grow"></div>
                <div>
                  {
                    createFunction ?
                      <LocalDialog varient={varient} createFunction={createFunction} />
                      : <Plus size={20} />
                  }
                </div>
              </div>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>

    </div>
  )
}

function LocalDialog({ varient, createFunction }: { varient: varient, createFunction: (formstate: FormType) => Promise<void> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl"><Plus />Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            Create New {varient}
          </DialogTitle>
          <DialogDescription>
            Enter the details below to record a new {varient.toLowerCase()}. This will be added to your {varient.toLowerCase()} history.
          </DialogDescription>
        </DialogHeader>
        <Form createFunction={createFunction} varient={varient} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { Dashboard as BaseDashboard };
