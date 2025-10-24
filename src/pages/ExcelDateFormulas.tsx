import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Helmet } from "react-helmet";

export default function ExcelDateFormulas() {
  return (
    <>
      <Helmet>
        <title>Excel Date Formulas Guide - TODAY, DATE, DATEDIF & More | FormulaGenie</title>
        <meta name="description" content="Master Excel date formulas. Learn TODAY, DATE, DATEDIF, EOMONTH, and more with practical examples for date calculations and formatting." />
        <meta property="og:title" content="Excel Date Formulas Guide - Complete Tutorial" />
        <meta property="og:description" content="Master Excel date formulas with practical examples and best practices." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Excel Date Formulas Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Master date calculations with essential Excel date functions
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate Date Formulas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Essential Date Functions</h2>
                </div>

                <div className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">TODAY() - Current Date</h3>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =TODAY()
                    </code>
                    <p className="text-sm text-muted-foreground mb-3">
                      Returns the current date. Updates automatically when the workbook is opened.
                    </p>
                    <div className="bg-primary/5 p-3 rounded">
                      <p className="text-sm"><strong>Example:</strong> Calculate days until deadline</p>
                      <code className="block bg-background/50 p-2 rounded text-xs mt-2">
                        =A2 - TODAY()
                      </code>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">NOW() - Current Date and Time</h3>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =NOW()
                    </code>
                    <p className="text-sm text-muted-foreground mb-3">
                      Returns the current date and time. Updates when the workbook recalculates.
                    </p>
                    <div className="bg-primary/5 p-3 rounded">
                      <p className="text-sm"><strong>Example:</strong> Timestamp for last updated</p>
                      <code className="block bg-background/50 p-2 rounded text-xs mt-2">
                        ="Last updated: " & TEXT(NOW(), "mm/dd/yyyy hh:mm AM/PM")
                      </code>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">DATE() - Create Specific Date</h3>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =DATE(year, month, day)
                    </code>
                    <p className="text-sm text-muted-foreground mb-3">
                      Creates a date from separate year, month, and day values.
                    </p>
                    <div className="bg-primary/5 p-3 rounded space-y-2">
                      <div>
                        <p className="text-sm"><strong>Example 1:</strong> Create December 31, 2024</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =DATE(2024, 12, 31)
                        </code>
                      </div>
                      <div>
                        <p className="text-sm"><strong>Example 2:</strong> First day of next month</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =DATE(YEAR(TODAY()), MONTH(TODAY())+1, 1)
                        </code>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">DATEDIF() - Calculate Date Differences</h3>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =DATEDIF(start_date, end_date, unit)
                    </code>
                    <p className="text-sm text-muted-foreground mb-3">
                      Calculates the difference between two dates in various units.
                    </p>
                    <div className="bg-primary/5 p-3 rounded space-y-2">
                      <p className="text-xs font-semibold mb-2">Units: "D"=Days, "M"=Months, "Y"=Years, "YM"=Months ignoring years, "MD"=Days ignoring months & years</p>
                      <div>
                        <p className="text-sm"><strong>Example:</strong> Calculate age in years</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =DATEDIF(A2, TODAY(), "Y")
                        </code>
                      </div>
                      <div>
                        <p className="text-sm"><strong>Example:</strong> Complete age format</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =DATEDIF(A2, TODAY(), "Y") & " years, " & DATEDIF(A2, TODAY(), "YM") & " months"
                        </code>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">EOMONTH() - End of Month</h3>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =EOMONTH(start_date, months)
                    </code>
                    <p className="text-sm text-muted-foreground mb-3">
                      Returns the last day of a month, offset by a number of months.
                    </p>
                    <div className="bg-primary/5 p-3 rounded space-y-2">
                      <div>
                        <p className="text-sm"><strong>Example 1:</strong> Last day of current month</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =EOMONTH(TODAY(), 0)
                        </code>
                      </div>
                      <div>
                        <p className="text-sm"><strong>Example 2:</strong> Last day of next month</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =EOMONTH(TODAY(), 1)
                        </code>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">WEEKDAY() - Day of Week</h3>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =WEEKDAY(date, [return_type])
                    </code>
                    <p className="text-sm text-muted-foreground mb-3">
                      Returns a number representing the day of the week (1=Sunday by default).
                    </p>
                    <div className="bg-primary/5 p-3 rounded space-y-2">
                      <div>
                        <p className="text-sm"><strong>Example:</strong> Check if weekend</p>
                        <code className="block bg-background/50 p-2 rounded text-xs mt-1">
                          =IF(OR(WEEKDAY(A2)=1, WEEKDAY(A2)=7), "Weekend", "Weekday")
                        </code>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Date Arithmetic</h2>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Adding/Subtracting Days</h3>
                      <code className="block bg-muted p-3 rounded text-sm mb-2">
                        =TODAY() + 30
                      </code>
                      <p className="text-sm text-muted-foreground">Adds 30 days to today's date</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Adding Months</h3>
                      <code className="block bg-muted p-3 rounded text-sm mb-2">
                        =DATE(YEAR(A2), MONTH(A2)+3, DAY(A2))
                      </code>
                      <p className="text-sm text-muted-foreground">Adds 3 months to date in A2</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Adding Years</h3>
                      <code className="block bg-muted p-3 rounded text-sm mb-2">
                        =DATE(YEAR(A2)+1, MONTH(A2), DAY(A2))
                      </code>
                      <p className="text-sm text-muted-foreground">Adds 1 year to date in A2</p>
                    </div>
                  </div>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Extracting Date Parts</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">YEAR()</h3>
                    <code className="block bg-muted p-2 rounded text-xs mb-2">
                      =YEAR(A2)
                    </code>
                    <p className="text-xs text-muted-foreground">Extracts year from date</p>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">MONTH()</h3>
                    <code className="block bg-muted p-2 rounded text-xs mb-2">
                      =MONTH(A2)
                    </code>
                    <p className="text-xs text-muted-foreground">Extracts month number (1-12)</p>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">DAY()</h3>
                    <code className="block bg-muted p-2 rounded text-xs mb-2">
                      =DAY(A2)
                    </code>
                    <p className="text-xs text-muted-foreground">Extracts day of month</p>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Common Date Scenarios</h2>
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Calculate Age from Birth Date</h3>
                    <code className="block bg-muted p-3 rounded text-sm">
                      =DATEDIF(A2, TODAY(), "Y") & " years old"
                    </code>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Days Between Two Dates</h3>
                    <code className="block bg-muted p-3 rounded text-sm">
                      =B2 - A2
                    </code>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Next Business Day (Monday)</h3>
                    <code className="block bg-muted p-3 rounded text-sm">
                      =TODAY() + IF(WEEKDAY(TODAY())=6, 3, IF(WEEKDAY(TODAY())=7, 2, 1))
                    </code>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">First Day of Current Month</h3>
                    <code className="block bg-muted p-3 rounded text-sm">
                      =DATE(YEAR(TODAY()), MONTH(TODAY()), 1)
                    </code>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Quarter from Date</h3>
                    <code className="block bg-muted p-3 rounded text-sm">
                      ="Q" & ROUNDUP(MONTH(A2)/3, 0)
                    </code>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Date Formatting Tips</h2>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Use TEXT() function to format dates as text:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <code className="block bg-muted p-2 rounded text-sm mb-1">
                        =TEXT(TODAY(), "mm/dd/yyyy")
                      </code>
                      <p className="text-xs text-muted-foreground">Result: 12/31/2024</p>
                    </div>
                    <div>
                      <code className="block bg-muted p-2 rounded text-sm mb-1">
                        =TEXT(TODAY(), "dddd, mmmm d, yyyy")
                      </code>
                      <p className="text-xs text-muted-foreground">Result: Tuesday, December 31, 2024</p>
                    </div>
                    <div>
                      <code className="block bg-muted p-2 rounded text-sm mb-1">
                        =TEXT(TODAY(), "mmm-yy")
                      </code>
                      <p className="text-xs text-muted-foreground">Result: Dec-24</p>
                    </div>
                  </div>
                </Card>
              </section>

              <div className="text-center pt-8">
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    Generate Date Formulas with AI <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
