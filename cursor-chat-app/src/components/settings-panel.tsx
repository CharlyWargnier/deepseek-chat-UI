"use client"

// import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, X } from "lucide-react"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  temperature: number
  onTemperatureChange: (value: number) => void
  model: string
  onModelChange: (value: string) => void
}

const models = [
  { value: "deepseek-ai/DeepSeek-R1-0528-Turbo", label: "DeepSeek-R1 Turbo" },
  { value: "meta-llama/Meta-Llama-3.1-70B-Instruct", label: "Llama 3.1 70B" },
  { value: "meta-llama/Meta-Llama-3.1-8B-Instruct", label: "Llama 3.1 8B" },
  { value: "microsoft/WizardLM-2-8x22B", label: "WizardLM 2 8x22B" },
  { value: "mistralai/Mixtral-8x7B-Instruct-v0.1", label: "Mixtral 8x7B" },
]

export function SettingsPanel({ 
  isOpen, 
  onClose, 
  temperature, 
  onTemperatureChange, 
  model, 
  onModelChange 
}: SettingsPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </CardTitle>
            <CardDescription>
              Configure your chat experience
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model-select">Model</Label>
            <Select value={model} onValueChange={onModelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((modelOption) => (
                  <SelectItem key={modelOption.value} value={modelOption.value}>
                    {modelOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="temperature-slider">Temperature</Label>
              <span className="text-sm text-muted-foreground">{temperature}</span>
            </div>
            <Slider
              id="temperature-slider"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => onTemperatureChange(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More focused</span>
              <span>More creative</span>
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={onClose} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 