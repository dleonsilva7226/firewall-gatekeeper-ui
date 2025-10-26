import { Shield, Crown, BarChart3, User } from "lucide-react";
import { Card } from "@/components/ui/card";

export type UserRole = "admin" | "superuser" | "analyst" | "guest";

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles = [
  { id: "admin" as UserRole, label: "Admin", icon: Crown, color: "text-accent" },
  { id: "superuser" as UserRole, label: "Superuser", icon: Shield, color: "text-primary" },
  { id: "analyst" as UserRole, label: "Analyst", icon: BarChart3, color: "text-success" },
  { id: "guest" as UserRole, label: "Guest", icon: User, color: "text-muted-foreground" },
];

export const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Role-Level Security</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`p-4 rounded-lg border-2 transition-smooth flex flex-col items-center gap-2 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : role.color}`} />
              <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                {role.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
