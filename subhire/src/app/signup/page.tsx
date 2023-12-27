'use client'; 
import './page.module.css';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs"

function SignUp({ /* props */ }) {
  const [state, setState] = useState(/* initial state */);
  useEffect(() => {
    
  }, [/* dependencies */]);
  return (
    <div className="flex h-full">
        <div className="m-auto">
            <h1 >How will you use SubHire?</h1>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">I'm a business</TabsTrigger>
                    <TabsTrigger value="password">I'm a contractor</TabsTrigger>
                    {/* <TabsTrigger value="password">I'm an employee</TabsTrigger> TODO: Eventually add invite employee, for compliance HR docs etc. purposes */} 
                </TabsList>
                <TabsContent value="account">
                    <Card>
                    <CardHeader>
                        <CardTitle>Sign up as an organization</CardTitle>
                        <CardDescription>
                            - Search through a database of verified professionals
                            - AI matches you a list of the potential best contractors for your project {/* ¿(requirements)? */}
                            - Easily onboard new hires, manage payouts and invoices
                            - Stay compliant with local tax and labor laws
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="contractor">
                    <Card>
                    <CardHeader>
                        <CardTitle>Contractor</CardTitle>
                        <CardDescription>
                        - Discover projects that match your skills and experience
                        - Bid to secure contracts at your preferred rate
                        - Build your Boost level by expanding portfolio and securing contracts
                        - Receive payouts according to your preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}

export default SignUp;